tab.setup = {
  tabs: document.getElementById('tab').getElementsByTagName('li'),
  pages: [
    document.getElementById('historyTop10_div'),
    document.getElementById('bookmarks_div'),
  ]
} //オブジェクトをセット
tab.init(); //起動！
