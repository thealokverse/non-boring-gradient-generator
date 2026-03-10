import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

let toastId = 0;

// ── Singleton toast store ─────────────────────────────────────────────────────
const listeners = new Set();
const toasts = [];

export function addToast(message) {
  const id = ++toastId;
  toasts.push({ id, message });
  listeners.forEach(fn => fn([...toasts]));
  setTimeout(() => {
    const idx = toasts.findIndex(t => t.id === id);
    if (idx !== -1) toasts.splice(idx, 1);
    listeners.forEach(fn => fn([...toasts]));
  }, 2400);
}

// ── ToastContainer component ──────────────────────────────────────────────────
export function ToastContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handler = (list) => setItems(list);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  if (!items.length) return null;

  return createPortal(
    <div className="toast-container">
      {items.map(t => (
        <div key={t.id} className="toast">{t.message}</div>
      ))}
    </div>,
    document.body
  );
}
