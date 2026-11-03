import { Effect } from 'effect';
import { Port } from 'foldkit';
export declare const ports: {
    inbound: {
        stepChanged: Port.Inbound<number, number>;
    };
    outbound: {
        countChanged: Port.Outbound<number, number>;
    };
};
export declare const makeElement: (container: HTMLElement, flags: Flags) => Readonly<{
    runtimeId: string;
    start: (preservedModel?: unknown) => Effect.Effect<void>;
    ports: {
        inbound: {
            stepChanged: Port.Inbound<number, number>;
        };
        outbound: {
            countChanged: Port.Outbound<number, number>;
        };
    };
    '~foldkit/RuntimeBoot'?: Readonly<{
        Flags: (flags: void) => void;
        Resources: (resources: never) => never;
        Kind: "Element";
    }>;
}>;
