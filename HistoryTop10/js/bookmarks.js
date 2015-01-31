BOOKMARKS_COMMON_WORD = 'http';

function buildBookmarkList(divName) {
  chrome.bookmarks.search(BOOKMARKS_COMMON_WORD, function(bookmarkItems) {
    buildBookmarkPopupDom(divName, bookmarkItems);
  });

//  chrome.bookmarks.getTree(function(bookmarkItems) {
//    buildBookmarkTree(divName, bookmarkItems);
//  });
}

/*
function buildBookmarkTree(divName, data) {
  var popupDiv = document.getElementById(divName);
  console.log(data[0].children);
}
*/


/**/
function buildBookmarkPopupDom(divName, data) {
  var popupDiv = document.getElementById(divName);

  //ul要素の作成
  var ul = document.createElement('ul');
  ul.id = 'bookmark';
  popupDiv.appendChild(ul);

  for (var i=0, ie=data.length; i<ie; ++i) {
    //ファビコンの設定
    var favicon = document.createElement('img');
    favicon.src = getFavicon(data[i].url);
    favicon.id = FAVICON_ID;
    favicon.height = 15;
    favicon.width = 15;

    //ブックマークの設定
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
    delImg.delId    = data[i].id;      //delete処理で使用するIDを得るためにdelImg要素に追加
    delImg.delTitle = data[i].title;   //delete処理で使用するTitleを得るためにdelImg要素に追加
    delImg.addEventListener('mouseover', onMouseEvent);
    delImg.addEventListener('mouseout', onMouseEvent);
    delImg.addEventListener('click', onDeleteBookmark);

    var li = document.createElement('li');
    li.appendChild(favicon);
    li.appendChild(a);
    li.appendChild(delImg);
    ul.appendChild(li);
  }
}
/**/

function onDeleteBookmark(event) {
  chrome.bookmarks.remove(event.toElement.delId, function(){
    var message = event.toElement.delTitle + 'を削除しますか？';
    if (window.confirm(message)) {
      event.srcElement.parentElement.parentElement.removeChild(event.srcElement.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  buildBookmarkList("bookmarks_div");
});
