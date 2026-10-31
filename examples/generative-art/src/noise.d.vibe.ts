/**
 * 2D Perlin noise. Returns a smooth pseudo-random value in roughly [-1, 1] for
 * any real-valued `(x, y)`. The same input always produces the same output;
 * neighbouring inputs produce smoothly varying outputs. Use small fractional
 * scales (e.g. multiply coordinates by 0.005) to get broad organic gradients.
 */
export declare const perlin2: (x: number, y: number) => number;
/**
 * Sum several octaves of `perlin2` into fractal Brownian motion. Higher
 * `octaves` add finer detail; `persistence` (0..1) controls how quickly
 * higher octaves fade, and `lacunarity` (>1) controls how much frequency
 * each octave adds. The result is normalised back to roughly [-1, 1].
 */
export declare const fractalNoise: (x: number, y: number, octaves: number, persistence: number, lacunarity: number) => number;
