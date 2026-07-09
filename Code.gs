/**
 * VS TRAVELS INDIA — LEAD CRM (Google Apps Script)
 * ---------------------------------------------------------------
 * Ye script website ke Contact Form aur B2B Form se aane wali har
 * enquiry ko is Google Sheet mein ek nayi row ke roop mein save
 * karta hai, taaki koi bhi follow-up miss na ho.
 *
 * SETUP STEPS (README.md mein detail mein bhi diya hai):
 * 1. sheets.google.com par jaake ek nayi blank Sheet banao.
 *    Naam do: "VS Travels - Leads"
 * 2. Sheet ke top menu se: Extensions > Apps Script
 * 3. Jo default code khulega use poora delete karke, ye poora
 *    file (Code.gs) copy-paste kar do.
 * 4. Upar "Save" (disk icon) dabao.
 * 5. "Deploy" > "New deployment" > gear icon > "Web app" select karo.
 *      - Description: VS Travels Leads
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. "Deploy" dabao. Google authorization maangega — apna Google
 *    account allow kar do (2 warning screens aa sakti hain,
 *    "Advanced" > "Go to project (unsafe)" dabakar allow karo —
 *    ye normal hai kyunki script khud apka bnaya hua hai).
 * 7. Deploy hone ke baad ek "Web app URL" milega — ye copy karo.
 * 8. index.html file mein CRM_WEBHOOK_URL variable mein
 *    ye URL paste kar do (README mein exact line di hai).
 * 9. Save karke website re-upload/publish karo. Bas — ab har
 *    naya enquiry is Sheet mein apne aap aa jayega!
 */

const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Pehli baar chalne par sheet + headers create karo
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        "Timestamp", "Source", "Name / Organisation", "Phone / Contact Person",
        "Destination", "Travel Date", "Group Type", "No. of People",
        "Message", "Status", "Follow-up Notes"
      ]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#0b2a4a").setFontColor("#ffffff");
      sheet.setColumnWidths(1, 11, 150);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp ? new Date(data.timestamp) : new Date(),
      data.source || "",
      data.name || data.organisation || "",
      data.phone || data.contactPerson || "",
      data.destination || "",
      data.travelDate || "",
      data.groupType || "",
      data.people || "",
      data.message || "",
      "New",           // Status — manually update: New / Contacted / Follow-up / Converted
      ""               // Follow-up Notes — apni notes yahan likho
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test ke liye — Apps Script editor mein "doGet" ko run karke check kar sakte ho ki script sahi deploy hui
function doGet() {
  return ContentService.createTextOutput("VS Travels CRM webhook is live ✅");
}
