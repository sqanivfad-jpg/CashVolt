import { Loader2 } from 'lucide-react';

interface ResultDisplayProps {
  result: { kwh: number; totalCost: number } | null;
  isCalculating: boolean;
}

export default function ResultDisplay({ result, isCalculating }: ResultDisplayProps) {
  const isCalculated = result !== null;
  
  // Guard against NaN — fallback to 0
  const rawKwh = isCalculated ? result.kwh : 250;
  const rawCost = isCalculated ? result.totalCost : 160.80;
  
  const displayKwh = isNaN(rawKwh) ? 0 : rawKwh;
  const displayCost = isNaN(rawCost) ? '0.00' : rawCost.toFixed(2);

  return (
    <div 
      className="glass-card" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '100%',
        padding: '3rem 2rem',
        border: isCalculated ? '2px solid var(--primary)' : '1px solid var(--border)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Decorative gradient orb in background */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: isCalculated 
            ? 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)' 
            : 'none',
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'all 0.5s ease'
        }} 
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {isCalculated ? 'תוצאת החישוב שלך' : 'דוגמא לתוצאה'}
        </p>
        
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          עבור צריכת חשמל של <strong style={{ fontSize: '1.25em', fontFamily: 'var(--font-display)' }}>{displayKwh}</strong> קוט"ש תשלמו:
        </p>
        
        {isCalculating ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
            <Loader2 className="animate-spin text-primary" size={48} aria-hidden="true" />
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>מחשב נתונים...</p>
          </div>
        ) : (
          <output 
            aria-live="polite"
            aria-atomic="true"
            style={{ 
              display: 'block',
              fontSize: 'clamp(3rem, 8vw, 4.5rem)', 
              fontWeight: 900, 
              fontFamily: 'var(--font-display)',
              lineHeight: 1,
              color: isCalculated ? 'var(--text-main)' : 'var(--text-muted)',
              opacity: isCalculated ? 1 : 0.4,
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            className={isCalculated ? 'text-gradient' : ''}
          >
            <span aria-hidden="true">₪</span>{displayCost}
          </output>
        )}
        
        {!isCalculated && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.8 }}>
            * זהו חישוב לדוגמא בלבד - מלאו את הפרטים בטופס לקבלת תוצאה מדויקת
          </p>
        )}
        
        {isCalculated && (
          <p style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 600 }} className="animate-fade-in">
            החישוב בוצע בהצלחה!
          </p>
        )}
      </div>
    </div>
  );
}
