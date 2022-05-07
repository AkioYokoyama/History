exports.deleteHistory = (url) => {
  chrome.history.deleteUrl({
    url: url
  })
}
