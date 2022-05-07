exports.truncateTitle = (title, length) => {
  if (title.length > length) {
    title = title.substring(0, length);
  }
  return title;
}
