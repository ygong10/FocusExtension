var setTimerButton = document.getElementById("set-timer-button");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(uid);
  }
});

setTimerButton.addEventListener("click", function() {
	var timerSelect = document.getElementById("timer-select");
	chrome.storage.local.set({"counterdownTimer": timeSelect.value}, function(items){
		console.log(items);
		chrome.extension.sendMessage({timerStatus: "running"}, function(response) {
			// Do something?
		});
	});
});







 