import { AnimatePresence } from 'framer-motion';
import GradientCard from './GradientCard';

export default function GradientHistory({ history, onLoad }) {
  if (!history.length) return null;

  return (
    <div>
      <p className="section-title" style={{ marginBottom: 10 }}>History</p>
      <div className="h-scroll">
        <AnimatePresence initial={false}>
          {history.map((g, i) => (
            <GradientCard
              key={`hist-${g.name}-${i}`}
              gradient={g}
              onClick={() => onLoad(g)}
              compact
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
