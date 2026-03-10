import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';

// ─────────────────────────────────────────────────────────────────────────────
// Segmented type selector
// ─────────────────────────────────────────────────────────────────────────────
function SegmentedControl({ options, value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      background: 'var(--panel-2)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: 3,
      gap: 2,
    }}>
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '7px 0',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              background: active ? 'var(--panel-3)' : 'transparent',
              border: active ? '1px solid var(--border-md)' : '1px solid transparent',
              color: active ? 'var(--text-1)' : 'var(--text-3)',
              cursor: 'pointer',
              transition: 'all var(--t-fast)',
              letterSpacing: '-0.01em',
              boxShadow: active ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle switch
// ─────────────────────────────────────────────────────────────────────────────
function Toggle({ label, description, checked, onChange, disabled = false }) {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 10,
        background: 'var(--panel-2)',
        border: '1px solid var(--border)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background var(--t-fast)',
        userSelect: 'none',
      }}
      onMouseEnter={e => !disabled && (e.currentTarget.style.background = 'var(--panel-hover)')}
      onMouseLeave={e => !disabled && (e.currentTarget.style.background = 'var(--panel-2)')}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', lineHeight: 1.3 }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
            {description}
          </div>
        )}
      </div>

      {/* Track */}
      <div style={{
        width: 44,
        height: 24,
        borderRadius: 99,
        background: checked ? 'var(--accent-a)' : 'var(--panel-3)',
        border: '1px solid var(--border-md)',
        position: 'relative',
        flexShrink: 0,
        transition: 'background var(--t-normal)',
        boxShadow: checked ? '0 0 10px rgba(255,122,24,0.35)' : 'none',
      }}>
        {/* Thumb */}
        <motion.div
          animate={{ x: checked ? 21 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            position: 'absolute',
            top: 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Color row with inline picker
// ─────────────────────────────────────────────────────────────────────────────
function ColorRow({ color, index, total, onChange, onRemove }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <motion.div
        whileHover={{ background: 'var(--panel-hover)' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 10px',
          borderRadius: 10,
          background: open ? 'var(--panel-hover)' : 'var(--panel-2)',
          border: `1px solid ${open ? 'var(--border-md)' : 'var(--border)'}`,
          cursor: 'pointer',
          transition: 'all var(--t-fast)',
        }}
        onClick={() => setOpen(o => !o)}
      >
        {/* Swatch */}
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: color,
          border: '2px solid rgba(255,255,255,0.15)',
          flexShrink: 0,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.3)`,
        }} />

        {/* Hex */}
        <span style={{
          flex: 1,
          fontSize: 12,
          fontFamily: 'monospace',
          color: 'var(--text-2)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}>
          {color}
        </span>

        {/* Remove */}
        {total > 2 && (
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={e => { e.stopPropagation(); onRemove(); }}
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: 'var(--danger-bg)',
              border: '1px solid var(--danger-border)',
              color: 'var(--danger)',
              fontSize: 15,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ×
          </motion.button>
        )}
      </motion.div>

      {/* Picker dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            style={{
              marginTop: 8,
              padding: 12,
              background: 'var(--panel-2)',
              border: '1px solid var(--border-md)',
              borderRadius: 12,
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <HexColorPicker color={color} onChange={onChange} style={{ width: '100%' }} />
            <button
              onClick={() => setOpen(false)}
              style={{
                marginTop: 10,
                width: '100%',
                padding: '7px',
                borderRadius: 7,
                background: 'var(--panel-3)',
                border: '1px solid var(--border)',
                color: 'var(--text-2)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main GradientControls
// ─────────────────────────────────────────────────────────────────────────────
export default function GradientControls({ gradient, onUpdate }) {
  const { type, colors, angle, animated, grain } = gradient;

  const handleColorChange = (idx, color) => {
    const next = [...colors];
    next[idx] = color;
    onUpdate({ colors: next });
  };

  const handleAddColor = () => {
    if (colors.length >= 4) return;
    onUpdate({ colors: [...colors, colors[colors.length - 1]] });
  };

  const handleRemoveColor = (idx) => {
    if (colors.length <= 2) return;
    onUpdate({ colors: colors.filter((_, i) => i !== idx) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Gradient type */}
      <div>
        <p className="section-title" style={{ marginBottom: 10 }}>Type</p>
        <SegmentedControl
          options={[
            { label: 'Linear', value: 'linear' },
            { label: 'Radial', value: 'radial' },
            { label: 'Conic',  value: 'conic'  },
          ]}
          value={type}
          onChange={t => onUpdate({ type: t })}
        />
      </div>

      <div className="divider" />

      {/* Colors */}
      <div>
        <p className="section-title" style={{ marginBottom: 10 }}>Colors</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {colors.map((color, i) => (
            <ColorRow
              key={i}
              color={color}
              index={i}
              total={colors.length}
              onChange={c => handleColorChange(i, c)}
              onRemove={() => handleRemoveColor(i)}
            />
          ))}
        </div>

        {colors.length < 4 && (
          <motion.button
            whileHover={{ background: 'var(--panel-hover)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddColor}
            style={{
              marginTop: 8,
              width: '100%',
              padding: '9px',
              borderRadius: 10,
              background: 'transparent',
              border: '1px dashed var(--border-md)',
              color: 'var(--text-3)',
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--t-fast)',
            }}
          >
            + Add color stop
          </motion.button>
        )}
      </div>

      {/* Angle — linear only */}
      <AnimatePresence initial={false}>
        {type === 'linear' && (
          <motion.div
            key="angle-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 4 }}>
              <div className="divider" style={{ marginBottom: 22 }} />
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}>
                  <p className="section-title">Angle</p>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: 'var(--accent-a)',
                    background: 'rgba(255,122,24,0.12)',
                    border: '1px solid rgba(255,122,24,0.2)',
                    padding: '2px 9px',
                    borderRadius: 6,
                  }}>
                    {angle}°
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={e => onUpdate({ angle: Number(e.target.value) })}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divider" />

      {/* Effects */}
      <div>
        <p className="section-title" style={{ marginBottom: 10 }}>Effects</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Toggle
            label="Animated"
            description="Smooth shifting gradient loop"
            checked={animated}
            onChange={v => onUpdate({ animated: v })}
            disabled={type !== 'linear'}
          />
          <Toggle
            label="Grain Texture"
            description="Film-grain noise overlay"
            checked={grain}
            onChange={v => onUpdate({ grain: v })}
          />
        </div>
      </div>
    </div>
  );
}
