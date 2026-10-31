/**
 * Forbids lifting a Command's result Message through Command.mapEffect via an
 * Effect.map that returns a Message constructor call. Manual wrapping fuses
 * into the Effect but records nothing on the message-mapping chain that Story
 * and Scene resolve replay. Use Command.mapMessage or Command.mapMessages.
 */
export declare const preferCommandMapmessage: import("effect-oxlint").CreateRule;
