"use strict"

firebase.initializeApp(config);

var countdownTimer = 0;

chrome.storage.local.set({ "counterdownTimer": 0 }, function(){
    //  Data's been saved boys and girls, go on home
});

chrome.storage.local.get("counterdownTimer", function(items){
	console.log(items);
});


