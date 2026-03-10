/**
 * colorGenerator.js
 * Generates visually pleasing color palettes using harmony rules.
 */

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Convert HSL values (0-360, 0-100, 0-100) to a hex color string. */
function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360;
  s = Math.min(100, Math.max(0, s));
  l = Math.min(100, Math.max(0, l));

  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);

  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Pick a random float in [min, max). */
function rand(min, max) {
  return min + Math.random() * (max - min);
}

/** Pick a random integer in [min, max]. */
function randInt(min, max) {
  return Math.floor(rand(min, max + 1));
}

/** Pick a random element from an array. */
function pick(arr) {
  return arr[randInt(0, arr.length - 1)];
}

// ── Palette Strategies ───────────────────────────────────────────────────────

/**
 * Analogous palette — neighbouring hues for a harmonious look.
 * Returns 2–4 colors.
 */
function analogousPalette() {
  const baseHue = rand(0, 360);
  const spread = rand(20, 50);
  const count = randInt(2, 4);
  const saturation = rand(65, 90);
  const lightness = rand(45, 65);

  return Array.from({ length: count }, (_, i) => {
    const hue = baseHue + (i - Math.floor(count / 2)) * spread;
    return hslToHex(hue, saturation, lightness);
  });
}

/**
 * Complementary palette — opposing hues for high contrast.
 * Returns 2–3 colors.
 */
function complementaryPalette() {
  const baseHue = rand(0, 360);
  const saturation = rand(70, 90);
  const lightness = rand(45, 60);
  const count = randInt(2, 3);

  const colors = [hslToHex(baseHue, saturation, lightness)];

  if (count === 3) {
    // Add a mid-tone split
    colors.push(hslToHex(baseHue + 30, saturation - 10, lightness + 10));
  }
  colors.push(hslToHex(baseHue + 180, saturation, lightness));
  return colors;
}

/**
 * Pastel palette — soft, low-saturation tones.
 * Returns 2–4 colors.
 */
function pastelPalette() {
  const baseHue = rand(0, 360);
  const spread = rand(30, 80);
  const count = randInt(2, 4);

  return Array.from({ length: count }, (_, i) =>
    hslToHex(
      baseHue + i * spread,
      rand(40, 60),   // gentle saturation
      rand(75, 90)    // high lightness = pastel
    )
  );
}

/**
 * Sunset palette — warm oranges, pinks, purples.
 * Returns 2–4 colors.
 */
function sunsetPalette() {
  const hueRanges = [
    [0, 15],    // red
    [20, 40],   // orange
    [280, 320], // purple-pink
    [330, 360], // deep pink/red
  ];

  const count = randInt(2, 4);
  const chosen = [];
  const shuffled = [...hueRanges].sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    const [min, max] = shuffled[i % shuffled.length];
    chosen.push(
      hslToHex(rand(min, max), rand(80, 100), rand(45, 65))
    );
  }
  return chosen;
}

/**
 * Neon palette — hyper-saturated, vivid hues.
 * Returns 2–3 colors.
 */
function neonPalette() {
  const baseHue = rand(0, 360);
  const gap = pick([120, 150, 180, 210]);
  const count = randInt(2, 3);

  return Array.from({ length: count }, (_, i) =>
    hslToHex(
      baseHue + i * gap,
      100,             // full saturation
      rand(50, 60)     // medium lightness for screen vibrancy
    )
  );
}

// ── Public API ───────────────────────────────────────────────────────────────

const STRATEGIES = [
  analogousPalette,
  complementaryPalette,
  pastelPalette,
  sunsetPalette,
  neonPalette,
];

/**
 * Generate a visually pleasing color palette using a random harmony rule.
 * Returns an array of 2–4 hex color strings.
 *
 * @returns {string[]}
 */
export function generateColorPalette() {
  const strategy = pick(STRATEGIES);
  return strategy();
}

/**
 * Generate a color palette using a specific harmony strategy.
 *
 * @param {"analogous"|"complementary"|"pastel"|"sunset"|"neon"} type
 * @returns {string[]}
 */
export function generateColorPaletteByType(type) {
  const map = {
    analogous: analogousPalette,
    complementary: complementaryPalette,
    pastel: pastelPalette,
    sunset: sunsetPalette,
    neon: neonPalette,
  };
  const strategy = map[type] ?? pick(STRATEGIES);
  return strategy();
}
