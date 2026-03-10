import { motion } from 'framer-motion';
import { generateGradientCSS } from '../utils/cssGenerator';

/**
 * GradientCard — reusable mini card for history strip and saved grid.
 *
 * Props:
 *  gradient  — gradient object
 *  onClick   — load action
 *  onDelete? — if provided, shows delete button
 *  compact?  — smaller fixed-width version for history strip
 */
export default function GradientCard({ gradient, onClick, onDelete, compact = false }) {
  const css = generateGradientCSS(gradient);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      whileHover={{ scale: 1.05, y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-md)',
        ...(compact
          ? { width: 112, height: 72, flexShrink: 0 }
          : { aspectRatio: '3/2' }),
      }}
    >
      {/* Gradient */}
      <div style={{ position: 'absolute', inset: 0, background: css }} />

      {/* Inner highlight */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Name + delete overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: compact ? '16px 7px 6px' : '24px 9px 9px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: compact ? 9 : 11,
          fontWeight: 600,
          color: '#fff',
          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          lineHeight: 1.2,
        }}>
          {gradient.name}
        </span>

        {onDelete && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.85 }}
            onClick={e => { e.stopPropagation(); onDelete(); }}
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: 'var(--danger-bg)',
              border: '1px solid var(--danger-border)',
              color: 'var(--danger)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: 4,
            }}
          >
            ×
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
