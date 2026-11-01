// The dialog machinery, focus management and scrolling are DOM code that a .vibe module does not use
// directly (VIP-33), and Effect has no service for the DOM, so the raw code lives here unchanged.
// dom.vibe keeps the public Effect API and reaches these through hatches.
import { Array, Equal, Function, Match, Number, Option, Result } from 'effect'

import type { DialogRuntime } from './dialogRuntime.vibe'
import type { FocusDirection } from './dom.vibe'
import { makeOutsideIsolation } from './inert.js'

type DialogRuntimeShape = typeof DialogRuntime.Service

export type ShowDialogOptions = Readonly<{
  focusSelector?: string
  isModal?: boolean
  allowedOutsideSelectors?: ReadonlyArray<string>
}>

export const asHtmlElement = (element: Element | null): HTMLElement | null =>
  element instanceof HTMLElement ? element : null

export const queryElement = (selector: string): Element | null =>
  document.querySelector(selector)

const BASE_DIALOG_Z_INDEX = 2147483600
let openDialogCount = 0

// NOTE: keyed by the dialog's id (string), not by the element object, because
// the unmount backstop must reclaim these resources after the `<dialog>` has
// already left the DOM (navigation away from a route-keyed subtree), when no
// live element is addressable. Membership in this map is the per-dialog "holds
// hygiene" flag, read-and-deleted to make release exactly-once.
type DialogHygiene = Readonly<{
  removeKeydownListener: () => void
  unregisterOwner: (() => void) | undefined
  returnFocus: HTMLElement | undefined
}>

const dialogHygieneById = new Map<string, DialogHygiene>()

type OpenDialog = Readonly<{
  id: string
  element: HTMLDialogElement
  isModal: boolean
  allowedOutsideSelectors: ReadonlyArray<string>
}>

let openDialogStack: ReadonlyArray<OpenDialog> = []
let modalIsolation: ReturnType<typeof makeOutsideIsolation> | undefined
let modalObserver: MutationObserver | undefined
let modalAllowedElements: ReadonlyArray<HTMLElement> = []
let modalAllowedOutsideElements: ReadonlyArray<HTMLElement> = []
let modalAllowedSelectors: ReadonlyArray<string> = []
let modalAllowedAncestors = new Set<HTMLElement>()

const containsAllowedSelector = (node: Node): boolean => {
  if (!(node instanceof Element || node instanceof DocumentFragment)) {
    return false
  }

  return Array.some(modalAllowedSelectors, selector => {
    try {
      return (
        (node instanceof Element && node.matches(selector)) ||
        node.querySelector(selector) !== null
      )
    } catch {
      return false
    }
  })
}

const containsCurrentAllowedElement = (node: Node): boolean =>
  Array.some(modalAllowedElements, element => node.contains(element))

const isRelevantModalMutation = (mutation: MutationRecord): boolean => {
  if (
    mutation.type === 'attributes' &&
    (mutation.attributeName === 'aria-hidden' ||
      mutation.attributeName === 'inert')
  ) {
    return (
      mutation.target instanceof HTMLElement &&
      modalIsolation?.contains(mutation.target) === true
    )
  }

  if (mutation.type === 'attributes') {
    return (
      Array.some(modalAllowedOutsideElements, element =>
        mutation.target.contains(element),
      ) || containsAllowedSelector(mutation.target)
    )
  }

  const changedNodes = [
    ...Array.fromIterable(mutation.addedNodes),
    ...Array.fromIterable(mutation.removedNodes),
  ]

  if (
    mutation.target instanceof HTMLElement &&
    modalAllowedAncestors.has(mutation.target) &&
    Array.some(changedNodes, node => node instanceof Element)
  ) {
    return true
  }

  return Array.some(
    changedNodes,
    node =>
      containsCurrentAllowedElement(node) || containsAllowedSelector(node),
  )
}

const ancestorsOfAllowedElements = (
  allowedElements: ReadonlyArray<HTMLElement>,
): Set<HTMLElement> => {
  const ancestors = new Set<HTMLElement>()

  for (const allowedElement of allowedElements) {
    let ancestor = allowedElement.parentElement

    while (ancestor !== null) {
      ancestors.add(ancestor)

      if (ancestor === document.body) {
        break
      }

      ancestor = ancestor.parentElement
    }
  }

  return ancestors
}

const recordModalAttributeMutations = (
  mutations: ReadonlyArray<MutationRecord>,
): void => {
  for (const mutation of mutations) {
    if (
      mutation.type === 'attributes' &&
      mutation.target instanceof HTMLElement &&
      (mutation.attributeName === 'aria-hidden' ||
        mutation.attributeName === 'inert')
    ) {
      modalIsolation?.recordAttributeMutation(
        mutation.target,
        mutation.attributeName,
      )
    }
  }
}

const synchronizeModalIsolation = (): void => {
  if (modalObserver !== undefined) {
    recordModalAttributeMutations(modalObserver.takeRecords())
  }

  modalObserver?.disconnect()

  const maybeTopmostModal = Array.last(
    Array.filter(openDialogStack, dialog => dialog.isModal),
  )
  if (Option.isNone(maybeTopmostModal)) {
    modalObserver?.disconnect()
    modalObserver = undefined
    modalIsolation?.dispose()
    modalIsolation = undefined
    modalAllowedElements = []
    modalAllowedOutsideElements = []
    modalAllowedSelectors = []
    modalAllowedAncestors = new Set()
    return
  }

  const { allowedOutsideSelectors } = maybeTopmostModal.value
  const dialogsAtOrAboveModal = Array.dropWhile(
    openDialogStack,
    dialog => dialog !== maybeTopmostModal.value,
  )
  const allowedOutsideElements = Array.filterMap(
    allowedOutsideSelectors,
    selector => {
      try {
        const outsideElement = document.querySelector(selector)
        return outsideElement instanceof HTMLElement
          ? Result.succeed(outsideElement)
          : Result.failVoid
      } catch {
        return Result.failVoid
      }
    },
  )

  const nextAllowedElements = [
    ...Array.map(dialogsAtOrAboveModal, dialog => dialog.element),
    ...allowedOutsideElements,
  ]

  modalIsolation ??= makeOutsideIsolation()
  modalIsolation.update(nextAllowedElements)
  modalAllowedElements = nextAllowedElements
  modalAllowedOutsideElements = allowedOutsideElements
  modalAllowedSelectors = allowedOutsideSelectors
  modalAllowedAncestors = ancestorsOfAllowedElements(nextAllowedElements)

  modalObserver ??= new MutationObserver(mutations => {
    if (Array.some(mutations, isRelevantModalMutation)) {
      recordModalAttributeMutations(mutations)
      synchronizeModalIsolation()
    }
  })
  modalObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}

const FOCUSABLE_SELECTOR = Array.join(
  [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ],
  ', ',
)

const isVisibleAndInteractiveElement = (element: HTMLElement): boolean =>
  element.closest('[hidden], [inert]') === null &&
  element.checkVisibility({ visibilityProperty: true })

const isFocusableElement = (element: Element): element is HTMLElement => {
  if (!(element instanceof HTMLElement)) {
    return false
  }

  if (element.matches(':disabled')) {
    return false
  }

  if (element instanceof HTMLInputElement && element.type === 'hidden') {
    return false
  }

  if (element.tabIndex < 0 && !element.hasAttribute('tabindex')) {
    return false
  }

  return isVisibleAndInteractiveElement(element)
}

const focusableElementsWithin = (
  root: ParentNode,
): ReadonlyArray<HTMLElement> =>
  Array.filter(
    Array.fromIterable(root.querySelectorAll(FOCUSABLE_SELECTOR)),
    isFocusableElement,
  )

const isValidReturnFocus = (element: HTMLElement): boolean => {
  if (!document.contains(element)) {
    return false
  }

  if (element instanceof HTMLDialogElement) {
    return element.open && isVisibleAndInteractiveElement(element)
  }

  return isFocusableElement(element)
}

export const showDialogElement = (
  element: HTMLDialogElement,
  options: ShowDialogOptions | undefined,
  maybeDialogRuntime: Option.Option<DialogRuntimeShape>,
): boolean => {
  const { id } = element
  const existingHygiene = dialogHygieneById.get(id)

  if (existingHygiene !== undefined) {
    return false
  }

  element.style.position = 'fixed'
  element.style.inset = '0'

  const previouslyFocused = document.activeElement
  const returnFocus =
    previouslyFocused instanceof HTMLElement &&
    previouslyFocused !== document.body
      ? previouslyFocused
      : undefined

  element.show()

  openDialogCount++
  element.style.zIndex = String(BASE_DIALOG_Z_INDEX + openDialogCount)

  openDialogStack = Array.append(
    Array.filter(openDialogStack, dialog => dialog.element !== element),
    {
      id,
      element,
      isModal: options?.isModal ?? false,
      allowedOutsideSelectors: options?.allowedOutsideSelectors ?? [],
    },
  )

  synchronizeModalIsolation()

  const handleKeydown = (event: KeyboardEvent): void => {
    if (!element.open) {
      return
    }

    const isTopmost = Option.exists(
      Array.last(openDialogStack),
      topmost => topmost.element === element,
    )
    if (!isTopmost) {
      return
    }

    Match.value(event.key).pipe(
      Match.when('Escape', () => {
        if (event.defaultPrevented) {
          return
        }

        event.preventDefault()
        element.dispatchEvent(new CustomEvent('cancel', { cancelable: true }))
      }),
      Match.when('Tab', () => {
        trapFocusWithinDialog(event, element)
      }),
      Match.orElse(Function.constVoid),
    )
  }

  document.addEventListener('keydown', handleKeydown)
  dialogHygieneById.set(id, {
    removeKeydownListener: () =>
      document.removeEventListener('keydown', handleKeydown),
    unregisterOwner: Option.isSome(maybeDialogRuntime)
      ? () => maybeDialogRuntime.value.unregister(id)
      : undefined,
    returnFocus,
  })

  if (Option.isSome(maybeDialogRuntime)) {
    maybeDialogRuntime.value.register(id)
  }

  const focusTarget = findDialogFocusTarget(element, options?.focusSelector)
  focusTarget.focus()

  return true
}

const findDialogFocusTarget = (
  dialog: HTMLDialogElement,
  focusSelector: string | undefined,
): HTMLElement => {
  if (focusSelector !== undefined) {
    const requestedFocusTarget = dialog.querySelector(focusSelector)
    if (
      requestedFocusTarget !== null &&
      isFocusableElement(requestedFocusTarget)
    ) {
      return requestedFocusTarget
    }
  }

  return Option.match(Array.head(focusableElementsWithin(dialog)), {
    onSome: Function.identity,
    onNone: () => dialog,
  })
}

const trapFocusWithinDialog = (
  event: KeyboardEvent,
  dialog: HTMLDialogElement,
): void => {
  const focusable = focusableElementsWithin(dialog)
  if (Array.isReadonlyArrayNonEmpty(focusable)) {
    const first = Array.headNonEmpty(focusable)
    const last = Array.lastNonEmpty(focusable)

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  } else {
    event.preventDefault()
    dialog.focus()
  }
}

/**
 * Closes a dialog element using `.close()`.
 * Cleans up the keyboard handlers installed by `showDialog`, restores modal
 * background isolation, and then returns focus to the element that was focused
 * before the dialog opened (the trigger, or the dialog beneath it when closing
 * a stacked dialog).
 * Resolves to `true` when it released the keyboard handlers, the return
 * focus, and the stack entry.
 * Resolves to `false` when the dialog held none, for example when the close
 * runs before `showDialog` has installed them. A caller that unlocks page
 * scroll after the close should unlock only when the result is `true`.
 * Fails with `ElementNotFound` if the selector does not match an `HTMLDialogElement`.
 *
 * @example
 * ```typescript
 * Dom.closeDialog('#my-dialog')
 * ```
 */

export const closeDialogElement = (element: HTMLDialogElement): boolean => {
  element.close()
  return releaseDialogHygieneById(element.id)
}

export const releaseDialogHygieneById = (id: string): boolean => {
  const hygiene = dialogHygieneById.get(id)
  if (hygiene === undefined) {
    return false
  }

  const maybeReleasedDialog = Array.findFirst(
    openDialogStack,
    dialog => dialog.id === id,
  )
  const isTopmost = Option.exists(
    Array.last(openDialogStack),
    dialog => dialog.id === id,
  )

  if (Option.isSome(maybeReleasedDialog)) {
    for (const openDialog of openDialogStack) {
      if (openDialog.id === id) {
        continue
      }

      const openHygiene = dialogHygieneById.get(openDialog.id)
      const openReturnFocus = openHygiene?.returnFocus

      if (
        openHygiene !== undefined &&
        openReturnFocus !== undefined &&
        maybeReleasedDialog.value.element.contains(openReturnFocus)
      ) {
        dialogHygieneById.set(openDialog.id, {
          ...openHygiene,
          returnFocus: hygiene.returnFocus,
        })
      }
    }
  }

  openDialogStack = Array.filter(openDialogStack, dialog => dialog.id !== id)
  synchronizeModalIsolation()
  openDialogCount = Math.max(0, Number.decrement(openDialogCount))
  hygiene.removeKeydownListener()
  dialogHygieneById.delete(id)
  hygiene.unregisterOwner?.()

  const { returnFocus } = hygiene
  if (
    isTopmost &&
    returnFocus !== undefined &&
    isValidReturnFocus(returnFocus)
  ) {
    returnFocus.focus()
  }

  return true
}

/**
 * Releases the framework hygiene a dialog holds while open: the focus-trap
 * keyboard handler, modal background isolation, the recorded return focus,
 * the dialog stack entry, the z-index counter, and one page scroll lock.
 * Use this when the element is removed without a close Message, such as
 * navigation away from a route-keyed subtree. The runtime also calls it
 * directly on disposal. The normal close path already releases these.
 * That path is `closeDialog` first, then the Dialog component's scroll unlock
 * when `closeDialog` reports a release. This function is the cleanup for the
 * case where no close Message ever reaches `update`.
 *
 * Addressed by the dialog's id, not a selector, because the element is
 * typically already gone from the DOM by the time this runs (that is the whole
 * point of the backstop). The hygiene installed by `showDialog` is tracked by
 * id so it can be reclaimed without a live element handle. The id must be
 * non-empty and unique within the document, since it keys this cleanup
 * accounting; a duplicate or empty id would release the wrong dialog's hygiene.
 *
 * Idempotent and exactly-once. It releases only when the dialog currently
 * holds hygiene, then clears the per-dialog marker, so calling it after a
 * normal close, or twice, is a no-op that never under-counts the shared
 * scroll lock. Carries no application close semantics: the Dialog component
 * owns the user-facing close (animation, `Closed` OutMessage, consumer
 * Commands); this only reclaims framework resources.
 *
 * Resolves to `true` when it released resources, `false` when there was
 * nothing to release. Never fails: an id with no held hygiene is a no-op,
 * since the goal is reclaiming resources that may already be gone.
 *
 * @example
 * ```typescript
 * Dom.releaseDialogResources('my-dialog')
 * ```
 */

const findScrollParent = (element: HTMLElement): Option.Option<HTMLElement> => {
  let candidate = element.parentElement
  while (candidate !== null) {
    const { overflowY } = getComputedStyle(candidate)
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return Option.some(candidate)
    }
    candidate = candidate.parentElement
  }
  return Option.none()
}

export const scrollElementIntoViewIfNotVisible = (
  element: HTMLElement,
  block: ScrollLogicalPosition,
): void => {
  Option.match(findScrollParent(element), {
    onNone: () => element.scrollIntoView({ block: block }),
    onSome: scrollParent => {
      const parentRect = scrollParent.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      const isFullyVisible =
        elementRect.top >= parentRect.top &&
        elementRect.bottom <= parentRect.bottom
      if (!isFullyVisible) {
        element.scrollIntoView({ block })
      }
    },
  })
}

export const advanceFocusFrom = (
  reference: HTMLElement,
  direction: FocusDirection,
): boolean => {
  const focusableElements = focusableElementsWithin(document)

  const referenceElementIndex = Array.findFirstIndex(
    focusableElements,
    Equal.equals(reference),
  )

  if (Option.isNone(referenceElementIndex)) {
    return false
  }

  const offsetReferenceElementIndex = Match.value(direction).pipe(
    Match.when('Next', () => Number.increment),
    Match.when('Previous', () => Number.decrement),
    Match.exhaustive,
  )(referenceElementIndex.value)

  const nextElement = Array.get(focusableElements, offsetReferenceElementIndex)

  if (Option.isSome(nextElement)) {
    nextElement.value.focus()
  }
  return true
}
