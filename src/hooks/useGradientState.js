/**
 * useGradientState.js
 * Central React hook for managing gradient state, history, and saved gradients.
 */

import { useState, useCallback, useEffect } from "react";
import { generateColorPalette } from "../utils/colorGenerator";
import { generateGradientName } from "../utils/gradientNameGenerator";

// ── Constants ────────────────────────────────────────────────────────────────

const LOCALSTORAGE_KEY = "nbgg_saved_gradients";
const MAX_HISTORY = 8;

/** @type {import("../utils/cssGenerator").Gradient} */
const DEFAULT_GRADIENT = {
  name: "Electric Aurora",
  type: "linear",
  colors: ["#ff6a00", "#ee0979"],
  angle: 120,
  animated: false,
  grain: false,
};

// ── LocalStorage helpers ─────────────────────────────────────────────────────

/**
 * Load saved gradients from LocalStorage.
 * Returns an empty array if nothing is stored or JSON parse fails.
 * @returns {import("../utils/cssGenerator").Gradient[]}
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LOCALSTORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Persist saved gradients to LocalStorage.
 * @param {import("../utils/cssGenerator").Gradient[]} gradients
 */
function saveToStorage(gradients) {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(gradients));
  } catch (err) {
    console.error("[NBGG] Failed to write to LocalStorage:", err);
  }
}

/**
 * Strip a gradient object down to only the serialisable fields we persist.
 * @param {import("../utils/cssGenerator").Gradient} gradient
 * @returns {import("../utils/cssGenerator").Gradient}
 */
function sanitizeForStorage(gradient) {
  const { name, type, colors, angle, animated, grain } = gradient;
  return { name, type, colors, angle, animated, grain };
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useGradientState
 *
 * Manages:
 *  - `gradient`         — the currently active gradient
 *  - `gradientHistory`  — up to 8 past gradients (newest first)
 *  - `savedGradients`   — gradients persisted in LocalStorage
 *
 * @returns {{
 *   gradient: import("../utils/cssGenerator").Gradient,
 *   gradientHistory: import("../utils/cssGenerator").Gradient[],
 *   savedGradients: import("../utils/cssGenerator").Gradient[],
 *   generateNewGradient: () => void,
 *   updateGradient: (changes: Partial<import("../utils/cssGenerator").Gradient>) => void,
 *   saveGradient: (gradient?: import("../utils/cssGenerator").Gradient) => void,
 *   deleteSavedGradient: (name: string) => void,
 *   loadGradient: (gradient: import("../utils/cssGenerator").Gradient) => void,
 * }}
 */
export function useGradientState() {
  const [gradient, setGradient] = useState(DEFAULT_GRADIENT);
  const [gradientHistory, setGradientHistory] = useState([]);
  const [savedGradients, setSavedGradients] = useState(() => loadFromStorage());

  // Keep LocalStorage in sync whenever savedGradients changes.
  useEffect(() => {
    saveToStorage(savedGradients);
  }, [savedGradients]);

  // ── generateNewGradient ────────────────────────────────────────────────────

  /**
   * Create a brand-new gradient using random harmony-based colours and a
   * generated name. The current gradient is pushed onto history before
   * replacing it.
   */
  const generateNewGradient = useCallback(() => {
    const newGradient = {
      name: generateGradientName(),
      type: "linear",
      colors: generateColorPalette(),
      angle: Math.floor(Math.random() * 360),
      animated: false,
      grain: false,
    };

    setGradientHistory((prev) => {
      const updated = [gradient, ...prev];
      return updated.slice(0, MAX_HISTORY);
    });

    setGradient(newGradient);
  }, [gradient]);

  // ── updateGradient ─────────────────────────────────────────────────────────

  /**
   * Merge partial changes into the current gradient.
   * Accepts any subset of the gradient fields.
   *
   * @param {Partial<import("../utils/cssGenerator").Gradient>} changes
   */
  const updateGradient = useCallback((changes) => {
    setGradient((prev) => ({ ...prev, ...changes }));
  }, []);

  // ── saveGradient ───────────────────────────────────────────────────────────

  /**
   * Save the supplied gradient (or the current active one) to LocalStorage.
   * If a gradient with the same name already exists it will be overwritten.
   *
   * @param {import("../utils/cssGenerator").Gradient} [gradientToSave]
   */
  const saveGradient = useCallback(
    (gradientToSave) => {
      const target = sanitizeForStorage(gradientToSave ?? gradient);

      setSavedGradients((prev) => {
        // Replace existing entry with the same name, or prepend
        const filtered = prev.filter((g) => g.name !== target.name);
        return [target, ...filtered];
      });
    },
    [gradient]
  );

  // ── deleteSavedGradient ────────────────────────────────────────────────────

  /**
   * Remove a saved gradient by its name.
   *
   * @param {string} name
   */
  const deleteSavedGradient = useCallback((name) => {
    setSavedGradients((prev) => prev.filter((g) => g.name !== name));
  }, []);

  // ── loadGradient ───────────────────────────────────────────────────────────

  /**
   * Load a gradient from history or saved gradients, making it the active one.
   * The previous active gradient is pushed onto history first.
   *
   * @param {import("../utils/cssGenerator").Gradient} gradientToLoad
   */
  const loadGradient = useCallback(
    (gradientToLoad) => {
      setGradientHistory((prev) => {
        const updated = [gradient, ...prev];
        return updated.slice(0, MAX_HISTORY);
      });
      setGradient(gradientToLoad);
    },
    [gradient]
  );

  // ── Return ─────────────────────────────────────────────────────────────────

  return {
    gradient,
    gradientHistory,
    savedGradients,
    generateNewGradient,
    updateGradient,
    saveGradient,
    deleteSavedGradient,
    loadGradient,
  };
}
