import { type Html } from 'foldkit/html';
import type { Model } from '../model.vibe';
export declare const preview: ({ personalInfo: { firstName: { value: firstName }, lastName: { value: lastName }, email: { value: email }, phone: { value: phone }, portfolioUrl: { value: portfolio }, maybeSelectedPronoun, customPronouns, }, workHistory, education, skills, coverLetter, }: Model) => Html;
