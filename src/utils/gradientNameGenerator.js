/**
 * gradientNameGenerator.js
 * Generates aesthetic gradient names by combining curated word pools.
 */

const ADJECTIVES = [
  "Neon",
  "Electric",
  "Cosmic",
  "Midnight",
  "Crystal",
  "Lunar",
  "Solar",
  "Hyper",
  "Velvet",
  "Aurora",
];

const NOUNS = [
  "Sunset",
  "Bloom",
  "Pulse",
  "Ocean",
  "Nova",
  "Dream",
  "Plasma",
  "Horizon",
  "Glow",
  "Nebula",
];

/**
 * Pick a random element from an array.
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generate an aesthetic gradient name by combining a random adjective and noun.
 *
 * @returns {string} e.g. "Electric Aurora", "Cosmic Bloom"
 */
export function generateGradientName() {
  return `${pick(ADJECTIVES)} ${pick(NOUNS)}`;
}

/**
 * Generate multiple unique gradient names.
 *
 * @param {number} count Number of names to generate (default 5)
 * @returns {string[]}
 */
export function generateGradientNames(count = 5) {
  const names = new Set();
  const maxAttempts = count * 10;
  let attempts = 0;

  while (names.size < count && attempts < maxAttempts) {
    names.add(generateGradientName());
    attempts++;
  }

  return Array.from(names);
}
