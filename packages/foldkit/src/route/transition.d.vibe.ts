import { Option } from "effect";
/** A route change: where the application was and where it is now.
 *  `maybePreviousRoute` is `None` on the first render (a cold load), which
 *  {@link isEntering} treats as an entry. Build one with {@link coldLoad}
 *  in `init` and with {@link make} wherever the application handles its
 *  ChangedUrl Message, then hand it to per-cache step functions so `init`
 *  and navigation share one loading policy. */
export type Transition<Route> = Readonly<{
    maybePreviousRoute: Option.Option<Route>;
    nextRoute: Route;
}>;
/** Builds the {@link Transition} for an in-app navigation, from the route
 *  the Model still holds to the route the new URL parsed to. Arguments
 *  read in travel order: previous first, next second. */
export declare const make: <Route>(previousRoute: Route, nextRoute: Route) => Transition<Route>;
/** Builds the {@link Transition} for a cold load (a direct visit, a
 *  bookmark, a reload). There is no previous route, so {@link isEntering}
 *  counts the transition as an entry. */
export declare const coldLoad: <Route>(nextRoute: Route) => Transition<Route>;
/** The route a transition entered, whichever route that was:
 *  `Some(nextRoute)` when the next route's tag differs from the previous
 *  route's (a cold load counts as an entry), `None` when the transition
 *  stayed within one route, for example between two ids of one detail
 *  route. Match on the result to dispatch entry Commands for many routes
 *  in one place. For a single named route, {@link entered} narrows to its
 *  tag and {@link isEntering} is the plain predicate form. */
export declare const enteredAny: <Route extends Readonly<{
    _tag: string;
}>>({ maybePreviousRoute, nextRoute, }: Transition<Route>) => Option.Option<Route>;
/** The route a transition entered, narrowed to the given tag: `Some` of
 *  the entered route when this transition entered it, and `None`
 *  otherwise. The entry Command for a detail route usually needs the
 *  route's payload, and this returns it typed. {@link enteredAny} is the
 *  form that answers for every route at once. */
export declare const entered: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => Option.Option<Extract<Route, {
    _tag: Tag;
}>>;
/** The route a transition left, whichever route that was:
 *  `Some(previousRoute)` when the previous route's tag differs from the
 *  next route's, `None` on a cold load or when the transition stayed
 *  within one route. For one-shot Commands on the way out, saving a
 *  draft, recording that a visit ended. Things that live while a route is
 *  active, listeners, timers, handles, belong to a Subscription or
 *  ManagedResource condition on the Model instead, which also ends them
 *  when the route state disappears for reasons other than navigation.
 *  {@link exited} narrows to a single tag. */
export declare const exitedAny: <Route extends Readonly<{
    _tag: string;
}>>({ maybePreviousRoute, nextRoute, }: Transition<Route>) => Option.Option<Route>;
/** The route a transition left, narrowed to the given tag: `Some` of the
 *  exited route when this transition left it, and `None` otherwise.
 *  {@link exitedAny} is the form that answers for every route at once. */
export declare const exited: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => Option.Option<Extract<Route, {
    _tag: Tag;
}>>;
/** Both sides of a within-route navigation: `Some` of the previous and
 *  next routes, narrowed to the given tag, when the transition stayed on
 *  that route, and `None` when it entered it, left it, or never touched
 *  it. A cold load stays nowhere. For reacting to payload changes within
 *  one route, a detail id, a search text, when the previous value
 *  matters; when it does not, the ChangedUrl handler already has the next
 *  route. There is no tagless counterpart to this the way
 *  {@link enteredAny} answers for {@link entered}: without a tag the two
 *  sides of a stay could not narrow to the same route variant together,
 *  so matching on one would leave the other typed as the whole union. */
export declare const stayed: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => Option.Option<Readonly<{
    previousRoute: Extract<Route, {
        _tag: Tag;
    }>;
    nextRoute: Extract<Route, {
        _tag: Tag;
    }>;
}>>;
/** Predicate for "this transition entered the given route": the next
 *  route carries the tag and the previous route did not (a cold load
 *  counts as an entry). Navigating within the same route, for example
 *  between two ids of one detail route, is not an entry. The boolean
 *  view of {@link entered}: when the entry Command needs the route's
 *  payload, use that instead. The route union is inferred from the
 *  transition argument, so the tag is checked against the union's
 *  tags. */
export declare const isEntering: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => boolean;
/** Whether the transition left the selected route. A cold load never exits.
 *  Use {@link exited} when its payload is needed. */
export declare const isExiting: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => boolean;
/** Whether both routes have the selected tag. A cold load never stays. Use
 *  {@link stayed} for both payloads. */
export declare const isStaying: <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag) => boolean;
/** Handlers for {@link match}, with Route narrowed to the selected tag. */
export type MatchHandlers<Route, Entered, Exited, Stayed, Unrelated> = Readonly<{
    Entered: (nextRoute: Route) => Entered;
    Exited: (previousRoute: Route) => Exited;
    Stayed: (routes: Readonly<{
        previousRoute: Route;
        nextRoute: Route;
    }>) => Stayed;
    Unrelated: () => Unrelated;
}>;
/** Runs exactly one handler for the selected route tag. A cold load is
 *  `Entered` or `Unrelated`. When both routes have the selected tag, the case
 *  is `Stayed`, even when their payloads differ. Handler routes are narrowed
 *  to the tag. The direct form infers a union of handler returns.
 *  `match<Output>()(...)` constrains every handler to `Output` while inferring
 *  the Route and tag. */
export declare function match<Output>(): <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag, handlers: MatchHandlers<Extract<Route, {
    _tag: Tag;
}>, Output, Output, Output, Output>) => Output;
export declare function match<Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag'], Entered, Exited, Stayed, Unrelated>(transition: Transition<Route>, routeTag: Tag, handlers: MatchHandlers<Extract<Route, {
    _tag: Tag;
}>, Entered, Exited, Stayed, Unrelated>): Entered | Exited | Stayed | Unrelated;
/** Runs the matching handler, or the fallback when that handler is omitted.
 *  A handler that returns `undefined` has handled the case. The direct form
 *  infers a union of callback returns. `matchOrElse<Output>()(...)` constrains
 *  every callback to `Output` while inferring the Route and tag. */
export declare function matchOrElse<Output>(): <Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag']>(transition: Transition<Route>, routeTag: Tag, handlers: Partial<MatchHandlers<Extract<Route, {
    _tag: Tag;
}>, Output, Output, Output, Output>>, fallback: () => Output) => Output;
export declare function matchOrElse<Route extends Readonly<{
    _tag: string;
}>, Tag extends Route['_tag'], Entered = never, Exited = never, Stayed = never, Unrelated = never, Fallback = never>(transition: Transition<Route>, routeTag: Tag, handlers: Partial<MatchHandlers<Extract<Route, {
    _tag: Tag;
}>, Entered, Exited, Stayed, Unrelated>>, fallback: () => Fallback): Entered | Exited | Stayed | Unrelated | Fallback;
