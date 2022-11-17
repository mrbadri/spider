function extractEmails(text) {
  if (!text) return null;
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}

module.exports = extractEmails;
