var historyTitleNum  = document.getElementById('hisTitleNum');
var historyNum       = document.getElementById('hisNum');
var historyTerm      = document.getElementById('hisTerm');

console.log(historyTitleNum);
console.log(historyNum);
console.log(historyTerm);

document.getElementById('save').onclick = function() {
  if ('' != historyTitleNum.value) {
    localStorage['hisTitleNum'] = historyTitleNum.value;
  }
  if ('' != historyNum.value) {
    localStorage['hisNum'] = historyNum.value;
  }
  if ('' != historyTerm[0].value) {
    localStorage['hisTerm'] = historyTerm.value;
  }
}

document.body.onload = function() {
  historyTitleNum.value  = localStorage['hisTitleNum'] ? localStorage['hisTitleNum'] : 13;
  historyNum.value       = localStorage['hisNum'] ? localStorage['hisNum'] : 10;
  historyTerm.value      = localStorage['hisTerm'] ? localStorage['hisTerm'] : 7;
}
