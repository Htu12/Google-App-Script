function reNameFile(folderId) {
  let folder = DriveApp.getFolderById(folderId);
  let files = folder.getFiles();

  let check = false;
  let count = 0;
  let totalFiles = 0;

  while (files.hasNext()) {
    let file = files.next();
    let fileName = handle(file.getName());
    if (fileName) {
      file.setName(fileName);
    }
    count++;
  }

  totalFiles = countFilesInFolder(folder);

  if (count == totalFiles) {
    check = true;
  }

  return check;
}

function countFilesInFolder(folder) {
  let files = folder.getFiles();
  let count = 0;
  while (files.hasNext()) {
    files.next();
    count++;
  }
  return count;
}

function handle(fileName) {
  // Copy of IMG_1574
  return fileName.split(" ")[2];
}

function main() {
  let status = reNameFile("1UqGV16492AcAUhp9V1990fu9EA7SY2jk");
  if (status) {
    Logger.log("Success!");
  } else {
    Logger.log("Failed :( !");
  }
}

main();
