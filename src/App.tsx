import { useState, useCallback } from 'react';
import Calculator from './components/Calculator';
import ResultDisplay from './components/ResultDisplay';
import PrivacyPolicy from './components/PrivacyPolicy';
import AccessibilityStatement from './components/AccessibilityStatement';
import { Zap } from 'lucide-react';
import './App.css';

type ViewState = 'calc' | 'privacy' | 'accessibility';

function App() {
  const [result, setResult] = useState<{ kwh: number; totalCost: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>('calc');

  const handleCalculate = useCallback((current: number, previous: number, pricePerKwh: number, discount: number) => {
    setIsCalculating(true);
    
    // Simulate a brief calculation delay to trigger the loading state (UX Requirement)
    setTimeout(() => {
      const kwh = Math.max(0, current - previous);
      const costBeforeDiscount = kwh * pricePerKwh;
      const totalCost = costBeforeDiscount * (1 - discount);
      
      setResult({ kwh, totalCost });
      setIsCalculating(false);
    }, 600);
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <>
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setCurrentView('calc')}>
          <Zap className="text-primary" size={28} aria-hidden="true" />
          <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            קאש-וולט <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>CashVolt</span>
          </span>
        </div>
      </header>

      <main className="container" style={{ flex: 1, padding: '3rem 1rem' }}>
        {currentView === 'calc' && (
          <>
            <section style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem auto' }} className="animate-fade-in">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--ring)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                <Zap size={16} aria-hidden="true" />
                תעריף מעודכן לשנת 2026
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
                מחשבון חשמל - חישוב <span className="text-gradient">חשבון חשמל</span> לפי מונה
              </h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                הקלידו את קריאת המונה הנוכחית והקודמת וחשבו בקלות כמה תצטרכו לשלם לחברת החשמל, כולל אפשרות להנחות מספקים פרטיים.
              </p>
            </section>

            <section 
              className="animate-fade-in delay-100" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', 
                gap: '2rem',
                alignItems: 'start'
              }}
            >
              <Calculator onCalculate={handleCalculate} onReset={handleReset} />
              <ResultDisplay result={result} isCalculating={isCalculating} />
            </section>
          </>
        )}

        {currentView === 'privacy' && <PrivacyPolicy onBack={() => setCurrentView('calc')} />}
        {currentView === 'accessibility' && <AccessibilityStatement onBack={() => setCurrentView('calc')} />}

      </main>

      <footer style={{ marginTop: 'auto', padding: '2rem 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <div className="container">
          <p>© {new Date().getFullYear()} קאש-וולט | CashVolt. כל הזכויות שמורות.</p>
          <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <button onClick={() => setCurrentView('accessibility')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit' }}>הצהרת נגישות</button>
            <span aria-hidden="true">|</span>
            <button onClick={() => setCurrentView('privacy')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit' }}>מדיניות פרטיות</button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
