TITLE_LENGTH = localStorage['hisTitleNum'] ? localStorage['hisTitleNum'] : 13;
HISTORY_NUM  = localStorage['hisNum'] ? localStorage['hisNum'] : 10;
HISTORY_TERM = localStorage['hisTerm'] ? localStorage['hisTerm'] : 7;

function buildPopupDom(divName, data) {
  var popupDiv = document.getElementById(divName);

  //ul要素の作成
  var ul = document.createElement('ul');
  ul.id = 'history';
  popupDiv.appendChild(ul);

  for (var i=0, ie=data.length; i<ie; ++i) {
    //titleが空の履歴は削除する
    if ('' == data[i].title) {
      chrome.history.deleteUrl({
        url: data[i].url
      });
      continue;
    }

    //ファビコンの設定
    var favicon = document.createElement('img');
    favicon.src = getFavicon(data[i].url);
    favicon.id = FAVICON_ID;
    favicon.height = 15;
    favicon.width = 15;

    //履歴の設定
    var a = document.createElement('a');
    a.href = data[i].url;
    a.appendChild(document.createTextNode(substrTitle(data[i].title, TITLE_LENGTH)));
    a.addEventListener('mouseover', onMouseEvent);
    a.addEventListener('mouseout', onMouseEvent);
    a.addEventListener('click', onAnchorClick);

    //削除アイコンの設定
    var delImg = document.createElement('img');
    delImg.src = DEL_IMG_PATH;
    delImg.id  = 'del';
    delImg.del = data[i].url;   //delete処理で使用するURLを得るためにdelImg要素に追加
    delImg.addEventListener('mouseover', onMouseEvent);
    delImg.addEventListener('mouseout', onMouseEvent);
    delImg.addEventListener('click', onDelImgClick);

    var li = document.createElement('li');
    li.appendChild(delImg);
    li.appendChild(favicon);
    li.appendChild(a);
    ul.appendChild(li);

    if (i > HISTORY_NUM) {break;}
  }
}

function buildHistoryList(divName) {
  var microsecondsPerTerm = 1000 * 60 * 60 * 24 * HISTORY_TERM;
  var term = (new Date).getTime() - microsecondsPerTerm;

  chrome.history.search({'text': '', 'startTime': term},function(historyItems) {
      var hisSortDescObj = sortVisitCount(historyItems);
      buildPopupDom(divName, hisSortDescObj);
    }
  );
}

function onDelImgClick(event) {
  chrome.history.deleteUrl({url: event.path[0].del});
  event.srcElement.parentElement.parentElement.removeChild(event.srcElement.parentElement);
}

function sortVisitCount(data) {
  data.sort(function(a,b) {
    return (a.visitCount < b.visitCount) ? 1 : -1;
  });
  return data;
}

document.addEventListener('DOMContentLoaded', function () {
  buildHistoryList("historyTop10_div");
});
