import { AnimatePresence } from 'framer-motion';
import GradientCard from './GradientCard';

export default function GradientLibrary({ savedGradients, onLoad, onDelete }) {
  if (!savedGradients.length) {
    return (
      <div>
        <p className="section-title" style={{ marginBottom: 10 }}>Saved</p>
        <div style={{
          padding: '24px 0',
          textAlign: 'center',
          color: 'var(--text-4)',
          fontSize: 13,
          borderRadius: 10,
          border: '1px dashed var(--border)',
          background: 'var(--panel-2)',
        }}>
          No saved gradients yet
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="section-title" style={{ marginBottom: 10 }}>
        Saved{' '}
        <span style={{ color: 'var(--text-4)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
          ({savedGradients.length})
        </span>
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 10,
      }}>
        <AnimatePresence>
          {savedGradients.map((g, i) => (
            <GradientCard
              key={`saved-${g.name}-${i}`}
              gradient={g}
              onClick={() => onLoad(g)}
              onDelete={() => onDelete(g.name)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
