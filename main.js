var trelloTimerDispatch = function(event) {
  var timerDiv = document.getElementById('trello-timer');
  var event = new Event(event);
  timerDiv.dispatchEvent(event);
}

var onDocumentReady = function() {
  var timerDiv = document.createElement('a');
  timerDiv.id = 'trello-timer';
  timerDiv.className = "header-btn";
  timerDiv.style.padding = "0 5px";
  timerDiv.style.fontSize = "24px";

  var countInterval;
  var count = 0;

  timerDiv.addEventListener('start', function() {
    countInterval = setInterval(function() {
      count++;
      var event = new CustomEvent('timeUpdated', {detail: count});
      timerDiv.dispatchEvent(event);
    }, 1000);
  });

  timerDiv.addEventListener('stop', function() {
    clearInterval(countInterval);
    count = 0;
    var event = new CustomEvent('timeUpdated', {detail: count});
    timerDiv.dispatchEvent(event);
  });

  timerDiv.addEventListener('timeUpdated', function(event){
    var minutes = Math.floor(event.detail/60).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
    var seconds = (event.detail % 60).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
    timerDiv.innerHTML = minutes + ":" + seconds;
  })

  timerDiv.innerHTML = '00:00';
  var headerUser = document.getElementsByClassName('header-user')[0];
  headerUser.appendChild(timerDiv);
  timerDiv.onclick = function() {
    trelloTimerDispatch('stop');
    trelloTimerDispatch('start');
  }
}

window.addEventListener('load', onDocumentReady, false )

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
 if (request.action == "startTrelloTimer") {
   trelloTimerDispatch('start');
   sendResponse('started');
 }
 else if (request.action == "stopTrelloTimer") {
   trelloTimerDispatch('stop');
   sendResponse('stopped');
 }
});
