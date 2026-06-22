# נדל"ן פרו · PWA

מערכת CRM לתיווך נדל"ן כ-Progressive Web App.

האפליקציה רצה כאתר, אבל אפשר להתקין אותה בטלפון מהדפדפן ולקבל אייקון על מסך הבית — בדיוק כמו אפליקציה מ-App Store / Google Play.

---

## 🚀 הפעלה מקומית (פיתוח)

```bash
# 1. התקן תלויות (פעם אחת)
npm install

# 2. הרץ שרת פיתוח
npm run dev
```

תראה משהו כזה:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.42:5173/
```

- **Local** — פותח בדפדפן של המחשב
- **Network** — פותח מהטלפון, **אם** הטלפון מחובר לאותו Wi-Fi של המחשב

### בדיקה מהטלפון בלי deploy
1. הטלפון והמחשב צריכים להיות באותה רשת Wi-Fi
2. פתח בטלפון את ה-Network URL (לדוגמה `http://192.168.1.42:5173/`)
3. Safari/Chrome יראו את האפליקציה בדיוק כמו ב-deploy אמיתי

---

## 🌐 העלאה לאוויר (deploy)

### דרך 1: Vercel (הכי קלה — מומלץ)

1. צור חשבון חינמי ב-https://vercel.com (אפשר להתחבר עם Google)
2. צור חשבון GitHub ב-https://github.com (אם אין)
3. העלה את התיקייה ל-GitHub:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   # ב-GitHub: צור repo חדש, ואז:
   git remote add origin https://github.com/YOUR_USER/nadlan-pro.git
   git push -u origin main
   ```
4. ב-Vercel לחץ "Import Project" ובחר את ה-repo שיצרת
5. Vercel מזהה אוטומטית שזה Vite — לחץ Deploy
6. תוך 2 דקות יש לך URL כמו `https://nadlan-pro.vercel.app`
7. כל push ל-GitHub יעדכן את האתר אוטומטית

### דרך 2: Netlify
1. צור חשבון ב-https://netlify.com
2. גרור את התיקייה כולה ל-Dashboard (אחרי `npm run build`)
3. כל מה שיש ב-`dist/` יעלה אוטומטית

### דרך 3: Cloudflare Pages
דומה ל-Vercel, חינמי, מהיר. ב-https://pages.cloudflare.com

---

## 📱 התקנה על הטלפון

אחרי שיש URL חי (מ-deploy או מהרשת המקומית):

### באנדרואיד (Chrome)
1. פתח את האתר ב-Chrome
2. אחרי 2-3 שניות תופיע באנר "הוספה למסך הבית" — לחץ
3. או: תפריט (⋮ למעלה) → "התקן אפליקציה"
4. אייקון "נדל"ן פרו" יופיע על מסך הבית
5. כשפותחים אותו — נראה כמו אפליקציה רגילה, בלי שורת כתובת

### באייפון (Safari)
1. פתח את האתר ב-Safari (לא Chrome — באייפון רק Safari תומך ב-PWA install)
2. לחץ על כפתור השיתוף (📤) למטה
3. גלול ולחץ "הוסף למסך הבית"
4. אישור — האייקון מופיע על מסך הבית

---

## ⚙️ build לפרודקשן

```bash
npm run build
```

יוצר תיקיית `dist/` עם הקבצים מינימליים מוכנים להעלאה לכל שרת סטטי.

```bash
npm run preview
```

מריץ את ה-build המוכן מקומית כדי לבדוק אותו לפני deploy.

---

## 🎯 מה כלול

- **כל המערכת** — Login, Dashboard, Leads, Properties, Deals, Map, Tasks, Calendar, Admin Console, AI Assistant
- **Mobile First** — עוצב לנייד מההתחלה, מתפרס יפה גם בדסקטופ
- **Offline support** — Service Worker שומר את האפליקציה בקאש, אז עובדת גם בלי אינטרנט (התמונות מ-picsum נשמרות 30 יום)
- **PWA install** — מותקן כאפליקציה אמיתית
- **RTL מלא** — עברית בכל מקום
- **Dark Mode** — כפתור בהדר

## 👥 חשבונות דמו

| משתמש | אימייל | סיסמה | תפקיד |
|---|---|---|---|
| רועי לוי | roi@nadlan.demo | demo1234 | מנהל משרד (Admin) |
| דנה כהן | dana@nadlan.demo | demo1234 | מתווכת |
| איתי שרון | itay@nadlan.demo | demo1234 | מתווך |
| מיכל אברהם | michal@nadlan.demo | demo1234 | יועצת משכנתאות |
| גיל בן דוד | gil@nadlan.demo | demo1234 | עו"ד |

רק רועי רואה את כפתור ה-Shield של ה-Admin Console.

---

## 🛠 בעיות נפוצות

**"npm install נכשל"** — תוודא Node 18+ מותקן. בדוק עם `node -v`.

**"האפליקציה לא מתעדכנת בטלפון"** — ה-Service Worker שומר בקאש. נקה אותו: בטלפון ב-Chrome → Settings → Site Settings → All Sites → מצא את האתר → Clear & Reset.

**"לא רואה את האפשרות 'הוסף למסך הבית'"** — באייפון חייב Safari, באנדרואיד Chrome. וודא שאתה ב-HTTPS (כל deploy ל-Vercel/Netlify כבר ב-HTTPS אוטומטית).

**"מציג רק כתובת ולא אפליקציה"** — לחץ על האייקון שיצרת ולא על Safari/Chrome. PWA נפתחות מהאייקון עם מסך מלא.
