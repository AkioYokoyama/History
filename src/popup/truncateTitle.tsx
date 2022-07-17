const truncateTitle = (length: number, title?: string) => {
  if (!title) return title;
  if (title.length > length) {
    return title.substring(0, length);
  }
  return title;
}

export default truncateTitle;
