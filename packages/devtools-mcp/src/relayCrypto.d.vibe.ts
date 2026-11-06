export declare const computeRelayProof: (token: string, role: 'client' | 'server', challenge: string) => string;
export declare const createRelayChallenge: (bytes: number) => string;
export declare const matchesRelayProof: (expectedHex: string, presentedHex: string) => boolean;
