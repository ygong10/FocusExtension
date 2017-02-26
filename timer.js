firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var timerUtilsContainer = document.getElementById("timer-utils-container");
    var timerRemaining = document.getElementById("timer-remaining");
    var maxTimer = document.getElementById("max-timer");
    var setTimerButton = document.getElementById("set-timer-button");
    var statusTimerButton = document.getElementById("status-timer-button");
    var resetTimerButton = document.getElementById("reset-timer-button");

    timerUtilsContainer.style.display = "block";
    timerRemaining.style.display = "block";
    maxTimer.style.display = "block";
    
    var getTimeRemaining = function() {
      if (isTimerRunning) {
        countdownTimer = countdownTimer - 1;

        if (countdownTimer <= 0) {
          countdownTimer = 0;
          
          // TODO:: send message to background script
        }
        document.getElementById("timer-remaining").innerHTML = "<b>Time Remaining:</b> " + countdownTimer + " secs";
      }
    };

    setInterval(function() {
        getTimeRemaining();
      }, 1000);

    setTimerButton.addEventListener("click", function() {
      var timerSelect = document.getElementById("timer-select");
      countdownTimer = timerSelect.value;
      document.getElementById("max-timer").innerHTML = "<b>Timer:</b> " + timerSelect.value + " secs";
    });

    statusTimerButton.addEventListener("click", function() {
      if (isTimerRunning) {
        statusTimerButton.textContent = "Start Timer";
        statusTimerButton.className = "btn btn-success";
        isTimerRunning = false;
      } else{
        statusTimerButton.textContent = "Pause Timer";
        statusTimerButton.className = "btn btn-danger";
        isTimerRunning = true;
      }
    });

    resetTimerButton.addEventListener("click", function() {
      var timerSelect = document.getElementById("timer-select");
      counterdownTimer = timerSelect.value;
      isTimerRunning = false;
    });

    
  } else {
    var timerUtilsContainer = document.getElementById("timer-utils-container");
    var timerRemaining = document.getElementById("timer-remaining");
    var maxTimer = document.getElementById("max-timer");
    timerUtilsContainer.style.display = "none";    
    timerRemaining.style.display = "none";
    maxTimer.style.display = "none";
  }
});