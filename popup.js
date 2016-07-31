console.log('toto')
var trelloTimerDispatch = function(action) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {action: action}, function(response) {
      console.log(response);
    });
  });
}
document.getElementById('trello-timer-popup-stop').onclick = function() {
  trelloTimerDispatch('stopTrelloTimer');
}
document.getElementById('trello-timer-popup-restart').onclick = function() {
  trelloTimerDispatch('stopTrelloTimer');
  trelloTimerDispatch('startTrelloTimer');
}
