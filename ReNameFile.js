function renameFiles(folderId) {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();

  let processed = 0;
  let changed = 0;
  let skipped = 0;
  let failed = 0;

  while (files.hasNext()) {
    const file = files.next();
    const oldName = file.getName();
    const newName = normalizeName(oldName);

    processed++;

    // Không làm gì nếu tên không thay đổi
    if (newName === oldName) {
      skipped++;
      continue;
    }

    try {
      file.setName(newName);
      changed++;
    } catch (e) {
      failed++;
      Logger.log(`Failed to rename "${oldName}" -> "${newName}": ${e}`);
    }
  }

  // Trả về số liệu để đánh giá health của job
  return { processed, changed, skipped, failed, success: failed === 0 };
}

// Chuẩn hóa tên file: bỏ prefix "Bản sao của " hoặc "Copy of "
function normalizeName(name) {
  const prefixes = ["Bản sao của ", "Copy of "];
  let result = name;

  for (const p of prefixes) {
    if (result.startsWith(p)) {
      result = result.slice(p.length);
      break; // chỉ cần bỏ 1 prefix
    }
  }

  // Dọn khoảng trắng thừa
  return result.trim();
}

function main() {
  const report = renameFiles("1toms8IGUXpYStGymfc6RBiDi6LHvPsmF");
  Logger.log(`Processed: ${report.processed}, Changed: ${report.changed}, Skipped: ${report.skipped}, Failed: ${report.failed}`);
  Logger.log(report.success ? "Success! Renames completed with zero failures." : "Completed with errors. Check logs.");
}
