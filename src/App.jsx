import { useRef } from 'react';
import './App.css';
import { useGradientState } from './hooks/useGradientState';
import { addToast, ToastContainer } from './components/Toast';

import Header          from './components/Header';
import GradientPreview from './components/GradientPreview';
import GradientControls from './components/GradientControls';
import ExportPanel     from './components/ExportPanel';
import GradientHistory from './components/GradientHistory';
import GradientLibrary from './components/GradientLibrary';
import { motion } from 'framer-motion';

// ── Section wrapper ───────────────────────────────────────────────────────────
function Panel({ children, style }) {
  return (
    <div className="panel" style={style}>
      {children}
    </div>
  );
}

// ── Save button ───────────────────────────────────────────────────────────────
function SaveButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ background: 'var(--panel-hover)', borderColor: 'var(--border-bright)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '11px',
        borderRadius: 'var(--r-md)',
        background: 'var(--panel-2)',
        border: '1px solid var(--border-md)',
        color: 'var(--text-2)',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        letterSpacing: '-0.01em',
        transition: 'all var(--t-fast)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
      }}
    >
      <span style={{ fontSize: 15, lineHeight: 1 }}>♡</span>
      Save Gradient
    </motion.button>
  );
}

// ── Section divider with label ───────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      margin: '4px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      <span className="section-title">{label}</span>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const {
    gradient,
    gradientHistory,
    savedGradients,
    generateNewGradient,
    updateGradient,
    saveGradient,
    deleteSavedGradient,
    loadGradient,
  } = useGradientState();

  const previewRef = useRef(null);

  const handleSave = () => {
    saveGradient();
    addToast('✓ Gradient saved');
  };

  return (
    <div className="app-layout">
      <Header onGenerate={generateNewGradient} />

      <main className="app-main">

        {/* ── Left column ──────────────────────────────────────────────────── */}
        <div className="app-left">

          {/* Hero preview */}
          <div ref={previewRef}>
            <GradientPreview gradient={gradient} />
          </div>

          {/* History */}
          {gradientHistory.length > 0 && (
            <Panel>
              <GradientHistory history={gradientHistory} onLoad={loadGradient} />
            </Panel>
          )}

          {/* Library */}
          <Panel>
            <GradientLibrary
              savedGradients={savedGradients}
              onLoad={loadGradient}
              onDelete={deleteSavedGradient}
            />
          </Panel>
        </div>

        {/* ── Right column ─────────────────────────────────────────────────── */}
        <div className="app-right">

          {/* Controls */}
          <Panel>
            <p className="section-title" style={{ marginBottom: 18 }}>Customize</p>
            <GradientControls
              gradient={gradient}
              onUpdate={updateGradient}
            />
            <div style={{ marginTop: 20 }}>
              <div className="divider" style={{ marginBottom: 16 }} />
              <SaveButton onClick={handleSave} />
            </div>
          </Panel>

          {/* Export */}
          <Panel>
            <p className="section-title" style={{ marginBottom: 14 }}>Export</p>
            <ExportPanel gradient={gradient} previewRef={previewRef} />
          </Panel>

        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
