function deleteTypeFilesInFolder() {
  var folderId = ""; // thay bằng ID thư mục
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var count = 0;

  while (files.hasNext()) {
    var file = files.next();
    var name = file.getName();
    var mimeType = file.getMimeType();

    if (mimeType == "image/cr2") {
      Logger.log(">>>LOG FILENAME: " + name);
      file.setTrashed(true);
      count++;
    }
  }

  Logger.log("Đã xóa " + count);
}
