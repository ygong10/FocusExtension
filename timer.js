chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.timerStatus === "running") {
		counter();
	};
});

var getTimeRemaining = function() {
  countdownTimer = countdownTimer - 1;
  if (countdownTimer <= 0) {
    clearInterval(counter);
    // send message to background script
  }
  console.log(document.getElementById("timer"));
  document.getElementById("timer").innerHTML = "<b>Timer:</b> " + countdownTimer + " secs";
};

var counter =	function() {
	setInterval(function() {
		getTimeRemaining();
	}, 1000);
};