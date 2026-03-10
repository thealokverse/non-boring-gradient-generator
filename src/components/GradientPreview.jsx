import { motion } from 'framer-motion';
import { generateGradientStyle } from '../utils/cssGenerator';

export default function GradientPreview({ gradient }) {
  // Bug fix: only animate on linear type
  const isAnimated = gradient.animated && gradient.type === 'linear';
  const style = generateGradientStyle({ ...gradient, animated: isAnimated });

  return (
    <div style={{ position: 'relative' }}>
      {/* Ambient glow behind the card */}
      <div style={{
        position: 'absolute',
        inset: '10%',
        background: style.background,
        filter: 'blur(48px)',
        borderRadius: 'var(--r-xl)',
        opacity: 0.35,
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <motion.div
        layout
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          aspectRatio: '16 / 9',
          width: '100%',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Gradient fill */}
        <motion.div
          key={JSON.stringify(gradient.colors) + gradient.type + gradient.angle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={isAnimated ? 'gradient-animated' : ''}
          style={{ position: 'absolute', inset: 0, ...style }}
        />

        {/* Top-edge highlight (inner reflection) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Grain overlay — only shown visually, excluded from PNG via class */}
        {gradient.grain && (
          <div className="grain-overlay" style={{ zIndex: 2 }} />
        )}

        {/* Name pill — top-left */}
        <div style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 3,
          background: 'rgba(0,0,0,0.42)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 999,
          padding: '5px 14px',
          fontSize: 12,
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '-0.01em',
        }}>
          {gradient.name}
        </div>

        {/* Bottom badges — type + effects */}
        <div style={{
          position: 'absolute',
          bottom: 14,
          right: 14,
          zIndex: 3,
          display: 'flex',
          gap: 6,
        }}>
          <Chip>{gradient.type}</Chip>
          {isAnimated && <Chip>animated</Chip>}
          {gradient.grain && <Chip>grain</Chip>}
        </div>
      </motion.div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span style={{
      background: 'rgba(0,0,0,0.38)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 6,
      padding: '3px 9px',
      fontSize: 10,
      fontWeight: 700,
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'capitalize',
      letterSpacing: '0.05em',
    }}>
      {children}
    </span>
  );
}
