export default function AccessibilityStatement({ onBack }: { onBack: () => void }) {
  return (
    <div className="glass-card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'right', padding: '2rem' }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '2rem' }}>&rarr; חזור למחשבון</button>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>הצהרת נגישות - CashVolt</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>תאריך עדכון אחרון: יוני 2026</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
        <p>אנו ב-CashVolt רואים חשיבות עליונה בהנגשת האתר לאנשים עם מוגבלויות, ובמתן שירות שוויוני, מכבד ונגיש לכלל גולשי האינטרנט.</p>
        
        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>רמת הנגישות</h3>
          <p>אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג 2013. התאמות הנגישות בוצעו עפ"י המלצות התקן הישראלי (ת"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG 2.1 הבינלאומי.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>פעולות ההנגשה שבוצעו באתר</h3>
          <ul style={{ paddingRight: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>ניווט מקלדת:</strong> האתר מותאם לחלוטין לניווט באמצעות מקלדת (שימוש במקשי Tab, Enter וחיצים).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>התאמה לקוראי מסך:</strong> שימוש נרחב בתגיות HTML סמנטיות ובמאפייני ARIA (כגון <code>aria-live</code>, <code>aria-invalid</code>) לטובת ציון שגיאות והקראת תוצאות החישוב בזמן אמת.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>ניגודיות צבעים:</strong> עיצוב ממשק המשתמש נבדק ועומד ביחסי ניגודיות (Contrast) גבוהים להבטחת קריאות מקסימלית לכבדי ראייה.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>רספונסיביות:</strong> האתר מותאם לתצוגה ברורה בכל סוגי המסכים (מחשב נייד, טאבלט וסמארטפון).</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>הגדלת תצוגה:</strong> ניתן להגדיל את התצוגה באתר באמצעות שימוש במקשי Ctrl ו-+ (פלוס) ללא פגיעה ברכיבי הממשק.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>חריגות (אם קיימות)</h3>
          <p>נכון למועד כתיבת הצהרה זו, לא ידוע על רכיבים שאינם נגישים לחלוטין באתר. עם זאת, ייתכן שיתגלו פערים מעת לעת במסגרת עדכונים חדשים.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>יצירת קשר ודיווח על תקלות נגישות</h3>
          <p>אנו ממשיכים במאמצים לשפר את נגישות האתר. אם נתקלתם בבעיית נגישות, או שיש לכם הערה/הצעה לשיפור, נשמח מאוד לקבל פנייה ולתקנה בהקדם האפשרי.</p>
          <p>
            רכז הנגישות: ישראל ישראלי (נא לעדכן שם)<br/>
            דוא"ל: <a href="mailto:accessibility@cashvolt.co.il" style={{ color: 'var(--primary)' }}>accessibility@cashvolt.co.il</a> (נא לעדכן)<br/>
            טלפון: 050-0000000
          </p>
        </section>
      </div>
    </div>
  );
}
