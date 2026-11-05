import * as fc from 'fast-check'
import { CalendarDate } from 'foldkit/calendar'
import {
  type Field,
  Invalid,
  NotValidated,
  Valid,
  Validating,
} from 'foldkit/fieldValidation'
import { modifyFields } from 'foldkit/struct'
import { expect, test } from 'vitest'

import { fieldValues } from './fixtures/foldkit-job-application-field-callback'
import * as Education from './step/education/entry/entry.vibe'
import * as Personal from './step/personalInfo/personalInfo.vibe'
import * as Skills from './step/skills/entry/entry.vibe'
import { revealFieldErrors } from './step/validation'
import * as Work from './step/workHistory/entry/entry.vibe'

const values = fc.oneof(
  fc.constantFrom(...fieldValues),
  fc.string({ maxLength: 64 }),
)
const fields = fc
  .tuple(
    fc.constantFrom('NotValidated', 'Validating', 'Valid', 'Invalid'),
    values,
    fc.boolean(),
  )
  .map(([mode, value, frozen]): Field<string> => {
    const field =
      mode === 'NotValidated'
        ? NotValidated({ value })
        : mode === 'Validating'
          ? Validating({ value })
          : mode === 'Valid'
            ? Valid({ value })
            : Invalid({ value, errors: ['saved error'] })
    return frozen ? Object.freeze(field) : field
  })
const models = fc.record({
  school: fields,
  degree: fields,
  fieldOfStudy: fields,
  firstName: fields,
  lastName: fields,
  email: fields,
  phone: fields,
  portfolioUrl: fields,
  skillName: fields,
  company: fields,
  title: fields,
})
const today = CalendarDate.make({ year: 2026, month: 1, day: 1 })

const expectField = (before: Field<string>, after: Field<string>) => {
  expect(after.value).toBe(before.value)
  if (before._tag === 'NotValidated') {
    expect(['NotValidated', 'Valid', 'Invalid']).toContain(after._tag)
    if (after._tag === 'NotValidated') expect(before.value.trim()).toBe('')
  } else {
    expect(after).toBe(before)
  }
}

test('native field callbacks preserve validation state and unrelated model data', () => {
  fc.assert(
    fc.property(models, sample => {
      const education = Object.freeze(
        modifyFields(Education.init('education'), {
          school: () => sample.school,
          degree: () => sample.degree,
          fieldOfStudy: () => sample.fieldOfStudy,
        }),
      )
      const expectedEducation = modifyFields(education, {
        school: revealFieldErrors(Education.schoolRules),
        degree: revealFieldErrors(Education.degreeRules),
        fieldOfStudy: revealFieldErrors(Education.fieldOfStudyRules),
      })
      const educationResult = Education.revealErrors(education)
      expect(educationResult).toEqual(expectedEducation)
      expect(Education.revealErrors(educationResult)).toEqual(educationResult)
      expectField(education.school, educationResult.school)
      expectField(education.degree, educationResult.degree)
      expectField(education.fieldOfStudy, educationResult.fieldOfStudy)

      const personal = Object.freeze(
        modifyFields(Personal.init(today), {
          firstName: () => sample.firstName,
          lastName: () => sample.lastName,
          email: () => sample.email,
          phone: () => sample.phone,
          portfolioUrl: () => sample.portfolioUrl,
        }),
      )
      const personalResult = Personal.revealErrors(personal)
      expectField(personal.firstName, personalResult.firstName)
      expectField(personal.lastName, personalResult.lastName)
      expectField(personal.email, personalResult.email)
      expectField(personal.phone, personalResult.phone)
      expectField(personal.portfolioUrl, personalResult.portfolioUrl)
      expect(personalResult.availableDate).toBe(personal.availableDate)
      expect(personalResult.pronouns).toBe(personal.pronouns)
      expect(Personal.revealErrors(personalResult)).toEqual(personalResult)

      const skills = Object.freeze(
        modifyFields(Skills.init('skill'), { name: () => sample.skillName }),
      )
      const skillsResult = Skills.revealErrors(skills)
      expect(skillsResult).toEqual(
        modifyFields(skills, { name: revealFieldErrors(Skills.nameRules) }),
      )
      expectField(skills.name, skillsResult.name)
      expect(Skills.revealErrors(skillsResult)).toEqual(skillsResult)

      const work = Object.freeze(
        modifyFields(Work.init('work', today), {
          company: () => sample.company,
          title: () => sample.title,
        }),
      )
      const workResult = Work.revealErrors(work)
      expect(workResult).toEqual(
        modifyFields(work, {
          company: revealFieldErrors(Work.companyRules),
          title: revealFieldErrors(Work.titleRules),
        }),
      )
      expectField(work.company, workResult.company)
      expectField(work.title, workResult.title)
      expect(Work.revealErrors(workResult)).toEqual(workResult)
    }),
    { seed: 1873198, numRuns: 200 },
  )
})

const capture = (run: () => unknown) => {
  try {
    run()
    return { threw: false, value: undefined }
  } catch (value) {
    return { threw: true, value }
  }
}

test('field callbacks preserve getter order and thrown-value identity', () => {
  const thrownValues = [
    undefined,
    null,
    false,
    'failure',
    new Error('failure'),
    Object.freeze({ tag: 'failure' }),
  ]
  fc.assert(
    fc.property(
      fc.constantFrom(...thrownValues),
      fc.boolean(),
      (thrown, failAtTag) => {
        let reads: Array<string> = []
        const bomb: Field<string> = Object.freeze({
          get _tag(): 'NotValidated' {
            reads.push('tag')
            if (failAtTag) throw thrown
            return 'NotValidated'
          },
          get value(): string {
            reads.push('value')
            throw thrown
          },
        })
        const model: Education.Model = Object.freeze({
          ...Education.init('getter'),
          school: bomb,
        })
        const before = capture(() =>
          modifyFields(model, {
            school: revealFieldErrors(Education.schoolRules),
            degree: revealFieldErrors(Education.degreeRules),
            fieldOfStudy: revealFieldErrors(Education.fieldOfStudyRules),
          }),
        )
        const expectedReads = reads
        reads = []
        const after = capture(() => Education.revealErrors(model))
        expect(before.threw).toBe(true)
        expect(after.threw).toBe(true)
        expect(before.value).toBe(thrown)
        expect(after.value).toBe(thrown)
        expect(reads).toEqual(expectedReads)
      },
    ),
    { seed: 1873199, numRuns: 200 },
  )
})
