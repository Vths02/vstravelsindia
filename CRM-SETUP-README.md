# VS Travels — Simple CRM Setup (Google Sheet based)

Ab website ke Contact Form aur B2B/Group Enquiry Form se aane wali har enquiry
automatically ek Google Sheet mein save ho jayegi — Name, Phone, Destination,
Date, Message, Status sab kuch. Bas naam, WhatsApp pe click karne ke saath
ye Sheet mein bhi record ho jayega, taaki koi lead miss na ho aur follow-up
track ho sake.

**Cost: ₹0 (bilkul free, Google account se hi chal jata hai)**

---

## Step 1 — Google Sheet banao
1. [sheets.google.com](https://sheets.google.com) kholo, "Blank" spreadsheet banao.
2. Naam do: **VS Travels - Leads**

## Step 2 — Apps Script jodo
1. Sheet ke top menu mein: **Extensions > Apps Script**
2. Jo default `Code.gs` khulega, uska poora content select karke delete kar do.
3. Iske saath diye gaye `Code.gs` file ka poora code copy karke wahan paste kar do.
4. Upar disk icon (💾) dabakar **Save** karo.

## Step 3 — Web App deploy karo
1. Top-right **Deploy > New deployment**
2. Gear icon (⚙️) dabao, **Web app** select karo.
3. Fill karo:
   - Description: `VS Travels Leads`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy** dabao.
5. Google authorization mangega — apna account choose karo. Agar
   "Google hasn't verified this app" warning aaye to ghabrao mat —
   **Advanced > Go to project (unsafe)** dabakar allow kar do.
   (Ye normal hai kyunki ye script khud aapka banaya hua hai, koi
   third-party app nahi.)
6. Deploy hone ke baad ek **Web app URL** milega jaisa:
   `https://script.google.com/macros/s/AKfycb.../exec`
   — Ise **copy** kar lo.

## Step 4 — Website mein URL paste karo
1. `index.html` file kholo (kisi bhi text editor mein).
2. `CRM_WEBHOOK_URL` dhundo (ye `<script>` tag ke shuru mein hai, top par).
3. Line dikhegi:
   ```js
   const CRM_WEBHOOK_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
4. `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` ko apne copy kiye URL se replace karo:
   ```js
   const CRM_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
5. File save karo, website ko re-upload/re-publish kar do (Hostinger,
   Netlify, GitHub Pages — jahan bhi hosted hai).

## Bas ho gaya! ✅
Ab jab bhi koi visitor **Contact Form** ya **B2B/Group Enquiry Form** bharega:
- WhatsApp pehle jaisa hi turant khulega (koi change nahi).
- Saath hi, uska data automatically **"VS Travels - Leads"** Google Sheet
  mein ek nayi row mein save ho jayega.

## Sheet mein kya milega
| Column | Kya hai |
|---|---|
| Timestamp | Kab enquiry aayi |
| Source | Contact Form ya B2B Enquiry |
| Name / Organisation | Customer ya company ka naam |
| Phone / Contact Person | Contact detail |
| Destination | Kahan jaana hai |
| Travel Date | Kab jaana hai |
| Group Type | (sirf B2B ke liye) Corporate/School/College |
| No. of People | Kitne log |
| Message | Customer ka message |
| **Status** | New / Contacted / Follow-up / Converted — isko manually update karo |
| **Follow-up Notes** | Apni notes yahan likho — kab call kiya, kya bola, etc. |

## Follow-up kaise miss na ho — tips
- Har din/hafta Sheet check karo, jo **Status = "New"** hai unko sabse pehle call karo.
- **Data > Create a filter** use karke Status ke hisaab se sort/filter kar sakte ho.
- Chaho to Google Sheet ke **"Conditional formatting"** se 3+ din purane
  "New" leads ko red color mein highlight kar sakte ho (follow-up reminder ban jayega).
- Sheet ko apne staff ke saath **Share** kar sakte ho, sab ek hi jagah leads dekh
  aur update kar sakenge — ye chhoti si free CRM ban jayegi.

Kabhi bhi is Sheet ko proper CRM tool (jaise Zoho CRM, HubSpot free plan) mein
upgrade karna ho to bata dena — same setup se aage bhi badha sakte hain.
