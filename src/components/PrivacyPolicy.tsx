

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="glass-card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'right', padding: '2rem' }}>
      <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '2rem' }}>&rarr; חזור למחשבון</button>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>מדיניות פרטיות - CashVolt</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>תאריך עדכון אחרון: יוני 2026</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.8' }}>
        <p>פרטיות המשתמשים שלנו נמצאת בראש סדר העדיפויות. בעמוד זה נפרט כיצד אנו נוהגים במידע הנאסף באתר.</p>
        
        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>איסוף ושמירת מידע</h3>
          <p>אתר CashVolt הינו כלי לחישוב מקומי בלבד. <strong>אנו לא אוספים, לא שומרים ולא משתפים</strong> שום מידע אישי או נתוני צריכה שהוזנו במחשבון. כל החישובים מבוצעים באופן ישיר בדפדפן שלך (Client-Side) והנתונים נמחקים ברגע שאתה סוגר את האתר.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>שימוש בעוגיות (Cookies)</h3>
          <p>האתר עשוי להשתמש בטכנולוגיות אחסון מקומי (Local Storage) אך ורק לצורך תפקוד תקין של האתר (למשל, שאיבת תעריף חשמל מעודכן). לא נעשה שום שימוש בעוגיות לצורך מעקב פולשני, פרופיילינג או פרסום ממוקד.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>אבטחת מידע</h3>
          <p>מאחר ואיננו אוספים מידע אישי וכל החישוב מבוצע אצלך במחשב או בטלפון, הסיכון לדלף מידע או פריצה הוא אפסי ביחס למערכת שלנו.</p>
        </section>

        <section>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>יצירת קשר</h3>
          <p>לשאלות נוספות בנושא פרטיות או הבהרות, ניתן לפנות אלינו בדוא"ל: <a href="mailto:contact@cashvolt.co.il" style={{ color: 'var(--primary)' }}>contact@cashvolt.co.il</a> (נא להחליף בכתובת אמיתית בהמשך).</p>
        </section>
      </div>
    </div>
  );
}
