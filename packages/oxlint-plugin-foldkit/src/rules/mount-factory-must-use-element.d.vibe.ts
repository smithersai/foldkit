/** Flags Mount.define and Mount.defineStream definitions whose `execute` never uses its element. A Mount exists for element-caused, element-targeted work; work that ignores the element belongs in a Command, Subscription, or ManagedResource. */
export declare const mountFactoryMustUseElement: import("effect-oxlint").CreateRule;
