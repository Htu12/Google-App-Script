function filterEmailsByDomain() {
  const allowedDomains = new Set([
    "google.com",
    "youtube.com",
    "thienhoang.com.vn",
    "mbbank.com.vn",
    "apd.edu.vn",
    "zalopay.vn",
    "123doc.org",
    "napthengay.vn",
    "divineshop.vn",
    "ved.com.vn",
    "kasikornbank.com",
    "mservice.com.vn",
    "email.apple.com",
  ]);

  GmailApp.getInboxThreads().forEach((thread) => {
    thread.getMessages().forEach((message) => {
      const fromAddress = message.getFrom();
      const domain = fromAddress.includes(">")
        ? fromAddress.split("@")[1].split(">")[0]
        : fromAddress.split("@")[1];

      if (!allowedDomains.has(domain)) {
        message.moveToTrash();
      }
    });
  });
}
