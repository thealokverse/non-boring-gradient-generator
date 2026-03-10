import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { generateGradientCSS, generateTailwindGradient } from '../utils/cssGenerator';
import { addToast } from './Toast';

function Label({ children }) {
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-4)',
    }}>
      {children}
    </span>
  );
}

function CopyBtn({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--text-2)',
        background: 'var(--panel-3)',
        border: '1px solid var(--border-md)',
        borderRadius: 6,
        padding: '3px 10px',
        cursor: 'pointer',
        transition: 'background var(--t-fast)',
      }}
    >
      Copy
    </motion.button>
  );
}

function CodeRow({ label, value, onCopy }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
        <Label>{label}</Label>
        <CopyBtn onClick={onCopy} />
      </div>
      <div className="code-block">{value}</div>
    </div>
  );
}

export default function ExportPanel({ gradient, previewRef }) {
  const cssValue = `background: ${generateGradientCSS(gradient)};`;
  const twValue  = generateTailwindGradient(gradient.colors, gradient.angle);

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast(`✓ ${label} copied`);
    } catch {
      addToast('Copy failed — try manually');
    }
  };

  const downloadPng = async () => {
    const el = previewRef?.current;
    if (!el) return;
    try {
      // Temporarily hide grain overlay for clean export
      const grain = el.querySelector('.grain-overlay');
      if (grain) grain.style.display = 'none';

      const dataUrl = await toPng(el, { pixelRatio: 2 });

      if (grain) grain.style.display = '';

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${gradient.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.click();
      addToast('✓ PNG saved');
    } catch {
      addToast('Export failed');
    }
  };

  return (
    <div>
      <CodeRow label="CSS"     value={cssValue} onCopy={() => copy(cssValue, 'CSS')} />
      <CodeRow label="Tailwind" value={twValue}  onCopy={() => copy(twValue, 'Tailwind')} />

      <motion.button
        whileHover={{ background: 'var(--panel-hover)' }}
        whileTap={{ scale: 0.97 }}
        onClick={downloadPng}
        style={{
          width: '100%',
          marginTop: 4,
          padding: '10px',
          borderRadius: 10,
          background: 'var(--panel-2)',
          border: '1px solid var(--border-md)',
          color: 'var(--text-2)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          transition: 'background var(--t-fast)',
        }}
      >
        ↓ Download PNG
      </motion.button>
    </div>
  );
}
