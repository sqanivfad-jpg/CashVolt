import React, { useState, useEffect, useRef } from 'react';
import { Calculator as CalcIcon, Info, AlertCircle } from 'lucide-react';

interface CalculatorProps {
  onCalculate: (current: number, previous: number, price: number, discount: number) => void;
  onReset: () => void;
}

interface FieldErrors {
  current: string | null;
  previous: string | null;
  general: string | null;
}

const DEFAULT_PRICE = 0.6432;

const emptyErrors: FieldErrors = { current: null, previous: null, general: null };

export default function Calculator({ onCalculate, onReset }: CalculatorProps) {
  const [current, setCurrent] = useState<string>('');
  const [previous, setPrevious] = useState<string>('');
  const [price, setPrice] = useState<number>(DEFAULT_PRICE);
  const [discount, setDiscount] = useState<number>(0);
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors);
  const [touched, setTouched] = useState<{ current: boolean; previous: boolean }>({ current: false, previous: false });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}config.json`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.pricePerKwh === 'number') {
          setPrice(data.pricePerKwh);
        }
      })
      .catch(err => console.error("Failed to fetch dynamic price config. Using default.", err));
  }, []);

  /** Full validation — returns field-level errors */
  const validateAll = (currStr: string, prevStr: string): FieldErrors => {
    const fieldErrors: FieldErrors = { current: null, previous: null, general: null };

    // Empty checks
    if (currStr.trim() === '') {
      fieldErrors.current = 'נא להזין קריאה נוכחית.';
    }
    if (prevStr.trim() === '') {
      fieldErrors.previous = 'נא להזין קריאה קודמת.';
    }

    // If either is empty, return early — no point checking values
    if (fieldErrors.current || fieldErrors.previous) return fieldErrors;

    const currNum = parseFloat(currStr);
    const prevNum = parseFloat(prevStr);

    if (isNaN(currNum)) {
      fieldErrors.current = 'נא להזין מספר תקין.';
    }
    if (isNaN(prevNum)) {
      fieldErrors.previous = 'נא להזין מספר תקין.';
    }
    if (fieldErrors.current || fieldErrors.previous) return fieldErrors;

    if (currNum < 0) fieldErrors.current = 'קריאת המונה לא יכולה להיות שלילית.';
    if (prevNum < 0) fieldErrors.previous = 'קריאת המונה לא יכולה להיות שלילית.';
    if (currNum > 9999999) fieldErrors.current = 'המספר שהוזן גדול מדי.';
    if (prevNum > 9999999) fieldErrors.previous = 'המספר שהוזן גדול מדי.';

    if (!fieldErrors.current && !fieldErrors.previous && currNum < prevNum) {
      fieldErrors.general = 'קריאה נוכחית חייבת להיות גדולה או שווה לקריאה קודמת.';
    }

    return fieldErrors;
  };

  const hasErrors = (errs: FieldErrors) => !!(errs.current || errs.previous || errs.general);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched on submit
    setTouched({ current: true, previous: true });

    const validationErrors = validateAll(current, previous);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      // Shake the form for visual feedback
      formRef.current?.classList.remove('shake');
      void formRef.current?.offsetWidth; // trigger reflow
      formRef.current?.classList.add('shake');
      return;
    }

    onCalculate(parseFloat(current), parseFloat(previous), price, discount);
  };

  const handleReset = () => {
    setCurrent('');
    setPrevious('');
    setDiscount(0);
    setErrors(emptyErrors);
    setTouched({ current: false, previous: false });
    onReset();
  };

  // Auto-calculate when both fields have valid data (live feedback)
  useEffect(() => {
    if (current === '' || previous === '') {
      // Only clear errors for untouched fields when both are empty
      if (!touched.current && !touched.previous) {
        setErrors(emptyErrors);
      }
      return;
    }

    const validationErrors = validateAll(current, previous);

    if (!hasErrors(validationErrors)) {
      setErrors(emptyErrors);
      onCalculate(parseFloat(current), parseFloat(previous), price, discount);
    } else {
      // Only show errors for fields the user already touched
      setErrors({
        current: touched.current ? validationErrors.current : null,
        previous: touched.previous ? validationErrors.previous : null,
        general: validationErrors.general,
      });
    }
  }, [current, previous, price, discount, onCalculate, touched]);

  const handleBlur = (field: 'current' | 'previous') => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate the individual field on blur
    const value = field === 'current' ? current : previous;
    if (value.trim() === '') {
      setErrors(prev => ({
        ...prev,
        [field]: field === 'current' ? 'נא להזין קריאה נוכחית.' : 'נא להזין קריאה קודמת.',
      }));
    } else {
      // Clear field error if it has a value
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const isFormEmpty = current.trim() === '' && previous.trim() === '';

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'var(--ring)' }}>
          <CalcIcon className="text-primary" size={20} aria-hidden="true" />
        </div>
        <h2 style={{ fontSize: '1.25rem' }}>חישוב חשבון חשמל</h2>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        onReset={handleReset}
        style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        aria-label="טופס חישוב צריכת חשמל"
        noValidate
      >
        {/* Current reading */}
        <div>
          <label htmlFor="current">קריאה נוכחית בקוט"ש</label>
          <input
            id="current"
            type="number"
            min="0"
            max="9999999"
            step="1"
            required
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => handleBlur('current')}
            placeholder="לדוגמה: 15400"
            aria-required="true"
            aria-invalid={!!errors.current}
            aria-describedby={errors.current ? 'error-current' : undefined}
            className={errors.current ? 'input-error' : ''}
          />
          {errors.current && (
            <div id="error-current" className="field-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              <span>{errors.current}</span>
            </div>
          )}
        </div>

        {/* Previous reading */}
        <div>
          <label htmlFor="previous">קריאה קודמת בקוט"ש</label>
          <input
            id="previous"
            type="number"
            min="0"
            max="9999999"
            step="1"
            required
            value={previous}
            onChange={(e) => setPrevious(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => handleBlur('previous')}
            placeholder="לדוגמה: 15150"
            aria-required="true"
            aria-invalid={!!errors.previous}
            aria-describedby={errors.previous ? 'error-previous' : undefined}
            className={errors.previous ? 'input-error' : ''}
          />
          {errors.previous && (
            <div id="error-previous" className="field-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              <span>{errors.previous}</span>
            </div>
          )}
        </div>

        {/* General error (e.g. current < previous) */}
        {errors.general && (
          <div id="calc-error" role="alert" className="field-error" style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)', borderRadius: '0.5rem' }}>
            <AlertCircle size={16} aria-hidden="true" />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Price (disabled) */}
        <div>
          <label htmlFor="costkwh">מחיר עדכני לקוט"ש (כולל מע"מ)</label>
          <div style={{ position: 'relative' }}>
            <input
              id="costkwh"
              type="number"
              disabled
              value={price}
              aria-label={`מחיר עדכני לקילוואט - ₪${price}`}
              style={{ backgroundColor: 'var(--border)', opacity: 0.8, cursor: 'not-allowed' }}
            />
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} aria-hidden="true">
              ₪
            </span>
          </div>
        </div>

        {/* Discount select */}
        <div>
          <label htmlFor="discountpower" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            הנחת ספק חשמל פרטי
            <span style={{ background: 'var(--primary)', color: 'white', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>חדש</span>
            <Info size={16} className="text-muted" aria-hidden="true" style={{ cursor: 'help' }} />
          </label>
          <select
            id="discountpower"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
            aria-label="בחר הנחת ספק חשמל פרטי"
          >
            <option value={0}>אין לי הנחה על חשבון החשמל</option>
            <option value={0.05}>5% עם אלקטרה / סלקום / פרטנר</option>
            <option value={0.06}>6% עם פזגז / בזק</option>
            <option value={0.07}>7% עם אלקטרה</option>
            <option value={0.15}>15% עם סלקום / פרטנר</option>
            <option value={0.20}>20% עם סלקום / פרטנר</option>
            <option value={0.21}>21% עם אלקטרה</option>
          </select>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
            <CalcIcon size={18} aria-hidden="true" />
            חשב צריכת חשמל
          </button>
          <button type="reset" className="btn btn-outline" style={{ flex: 1 }} disabled={isFormEmpty}>
            נקה
          </button>
        </div>
      </form>
    </div>
  );
}
