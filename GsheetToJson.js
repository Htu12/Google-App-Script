function exportToJsonFile() {
  const SHEET_ID   ="";
  const SHEET_NAME ="";

  const sheet = SpreadsheetApp.openById(`${SHEET_ID}`)
                              .getSheetByName(`${SHEET_NAME}`);

  const data = sheet.getDataRange().getValues();
  const header = data.shift(); // lấy dòng tiêu đề

  const jsonData = data.map((row, index) => {
    const obj = {};
    header.forEach((key, i) => obj[key] = row[i]);
    obj.row = index + 2;
    return obj;
  });

  const jsonString = JSON.stringify(jsonData, null, 2);

  const fileName = "data.json";
  const file = DriveApp.createFile(fileName, jsonString, MimeType.PLAIN_TEXT); // hoặc "application/json"
  Logger.log("Đã lưu file JSON tại: " + file.getUrl());

  return file.getUrl();
}
