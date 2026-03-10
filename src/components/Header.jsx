import { motion } from 'framer-motion';

export default function Header({ onGenerate }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(11,11,15,0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}>

        {/* Left — logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Logo square */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'var(--accent-grad)',
            flexShrink: 0,
            boxShadow: '0 0 18px rgba(255,80,80,0.28)',
          }} />

          <div>
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-1)',
              lineHeight: 1.2,
            }}>
              Non-Boring{' '}
              <span style={{
                background: 'var(--accent-grad)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Gradients
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>
              Beautiful gradients, instantly.
            </div>
          </div>
        </div>

        {/* Right — CTA */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(255,80,80,0.32)' }}
          whileTap={{ scale: 0.97 }}
          onClick={onGenerate}
          style={{
            background: 'var(--accent-grad)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            padding: '9px 20px',
            borderRadius: 'var(--r-md)',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 18px rgba(255,80,80,0.22)',
            transition: 'box-shadow var(--t-normal)',
          }}
        >
          ✦ Surprise Me
        </motion.button>
      </div>
    </header>
  );
}
