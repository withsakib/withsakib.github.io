// Shared helpers. This file loads first, so the other scripts can use these.

// True when the visitor's device is set to "reduce motion".
// We skip animations and typing effects for them.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
