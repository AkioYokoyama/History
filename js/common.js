DEL_IMG_PATH = 'img/del.png';
FAVICON_API  = 'http://www.google.com/s2/favicons?domain=';
DEL_IMG_ID   = 'del';
FAVICON_ID   = 'favi';

function onAnchorClick(event) {
  chrome.tabs.create({selected: true, url: event.srcElement.href});
  return false;
}

function onMouseEvent(event) {
  var bgc = '#fff';
  if ('mouseover' == event.type) {
    bgc = '#99ccff';
  }
  event.srcElement.parentElement.style.backgroundColor = bgc;
}

function getFavicon(url) {
  //URLからドメイン部分のみを取得
  var domain = url.match(/^[httpsfile]+:\/{2,3}([0-9a-zA-Z\.\-:]+?):?[0-9]*?\//i);
  var favicon = FAVICON_API;

  //ドメインがあるもののみファビコンを取得する
  if (domain) {
    favicon = favicon + domain[1];
  }
  return favicon;
}

function substrTitle(title, charNum) {
  if (title.length > charNum) {
    title = title.substring(0, charNum);
  }
  return title;
}
