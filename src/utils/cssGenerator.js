/**
 * cssGenerator.js
 * Generates CSS gradient strings and Tailwind gradient helpers.
 */

// ── Type Definitions (JSDoc) ─────────────────────────────────────────────────

/**
 * @typedef {Object} Gradient
 * @property {string}   name     - Human-readable gradient name
 * @property {"linear"|"radial"|"conic"} type - Gradient type
 * @property {string[]} colors   - Array of hex color strings
 * @property {number}   angle    - Angle in degrees (used by linear & conic)
 * @property {boolean}  animated - Whether the gradient should animate
 * @property {boolean}  grain    - Whether a film-grain overlay is applied
 */

// ── CSS Gradient Generator ───────────────────────────────────────────────────

/**
 * Generate a CSS gradient string from a gradient object.
 *
 * @param {Gradient} gradient
 * @returns {string} e.g. "linear-gradient(120deg, #ff6a00, #ee0979)"
 */
export function generateGradientCSS(gradient) {
  const { type, colors, angle = 135 } = gradient;
  const colorList = colors.join(", ");

  switch (type) {
    case "radial":
      return `radial-gradient(circle, ${colorList})`;

    case "conic":
      return `conic-gradient(from ${angle}deg, ${colorList})`;

    case "linear":
    default:
      return `linear-gradient(${angle}deg, ${colorList})`;
  }
}

/**
 * Generate a full CSS `background` property value, including optional animation
 * class hints as a data attribute string (animation handled via CSS classes).
 *
 * @param {Gradient} gradient
 * @returns {{ background: string, backgroundSize: string|undefined }}
 */
export function generateGradientStyle(gradient) {
  const background = generateGradientCSS(gradient);

  if (gradient.animated) {
    // For animated gradients we enlarge the background so we can shift it
    return {
      background,
      backgroundSize: "200% 200%",
    };
  }

  return { background };
}

// ── Tailwind Gradient Helper ─────────────────────────────────────────────────

/**
 * Map of common Tailwind color names to approximate hex ranges.
 * Used to find the closest Tailwind token for a given hex color.
 */
const TAILWIND_PALETTE = [
  { name: "red-500",    hex: "#ef4444" },
  { name: "orange-500", hex: "#f97316" },
  { name: "amber-500",  hex: "#f59e0b" },
  { name: "yellow-400", hex: "#facc15" },
  { name: "lime-500",   hex: "#84cc16" },
  { name: "green-500",  hex: "#22c55e" },
  { name: "teal-500",   hex: "#14b8a6" },
  { name: "cyan-500",   hex: "#06b6d4" },
  { name: "sky-500",    hex: "#0ea5e9" },
  { name: "blue-600",   hex: "#2563eb" },
  { name: "indigo-500", hex: "#6366f1" },
  { name: "violet-500", hex: "#8b5cf6" },
  { name: "purple-500", hex: "#a855f7" },
  { name: "fuchsia-500",hex: "#d946ef" },
  { name: "pink-500",   hex: "#ec4899" },
  { name: "rose-500",   hex: "#f43f5e" },
  { name: "slate-700",  hex: "#334155" },
  { name: "gray-800",   hex: "#1f2937" },
  { name: "white",      hex: "#ffffff" },
  { name: "black",      hex: "#000000" },
];

/**
 * Euclidean distance between two RGB values.
 * @param {{ r: number, g: number, b: number }} a
 * @param {{ r: number, g: number, b: number }} b
 * @returns {number}
 */
function rgbDistance(a, b) {
  return Math.sqrt(
    (a.r - b.r) ** 2 +
    (a.g - b.g) ** 2 +
    (a.b - b.b) ** 2
  );
}

/**
 * Parse a hex color string to an { r, g, b } object.
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number }}
 */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/**
 * Find the closest Tailwind color token for a given hex value.
 * @param {string} hex
 * @returns {string} Tailwind class suffix e.g. "pink-500"
 */
function closestTailwindColor(hex) {
  const target = hexToRgb(hex);
  let best = TAILWIND_PALETTE[0];
  let bestDist = Infinity;

  for (const entry of TAILWIND_PALETTE) {
    const dist = rgbDistance(target, hexToRgb(entry.hex));
    if (dist < bestDist) {
      bestDist = dist;
      best = entry;
    }
  }

  return best.name;
}

/**
 * Map of gradient directions for Tailwind `bg-gradient-to-*` utilities.
 * Angle → Tailwind suffix.
 */
const DIRECTION_MAP = [
  { max: 22,  cls: "bg-gradient-to-r"  },
  { max: 67,  cls: "bg-gradient-to-br" },
  { max: 112, cls: "bg-gradient-to-b"  },
  { max: 157, cls: "bg-gradient-to-bl" },
  { max: 202, cls: "bg-gradient-to-l"  },
  { max: 247, cls: "bg-gradient-to-tl" },
  { max: 292, cls: "bg-gradient-to-t"  },
  { max: 337, cls: "bg-gradient-to-tr" },
  { max: 360, cls: "bg-gradient-to-r"  },
];

/**
 * Resolve a Tailwind direction class from an angle.
 * @param {number} angle
 * @returns {string}
 */
function angleToTailwindDirection(angle) {
  const normalized = ((angle % 360) + 360) % 360;
  return (
    DIRECTION_MAP.find((d) => normalized <= d.max)?.cls ??
    "bg-gradient-to-r"
  );
}

/**
 * Generate a Tailwind CSS gradient utility string from a colors array.
 *
 * Only the first three colors are mapped to `from-`, `via-`, `to-` stops.
 * Supports linear gradients only (Tailwind's built-in gradient utilities).
 *
 * @param {string[]} colors - Array of hex color strings
 * @param {number}   [angle=135] - Gradient angle (used to pick direction class)
 * @returns {string} e.g. "bg-gradient-to-r from-pink-500 to-orange-500"
 */
export function generateTailwindGradient(colors, angle = 135) {
  const [from, via, to] = colors.map(closestTailwindColor);
  const direction = angleToTailwindDirection(angle);

  const parts = [direction, `from-${from}`];
  if (via && colors.length >= 3) parts.push(`via-${via}`);
  parts.push(`to-${to ?? from}`);

  return parts.join(" ");
}

// ── Convenience re-export ────────────────────────────────────────────────────

/**
 * Generate both CSS and Tailwind representations of a gradient.
 *
 * @param {Gradient} gradient
 * @returns {{ css: string, tailwind: string, style: object }}
 */
export function generateGradientRepresentations(gradient) {
  return {
    css: generateGradientCSS(gradient),
    tailwind: generateTailwindGradient(gradient.colors, gradient.angle),
    style: generateGradientStyle(gradient),
  };
}
