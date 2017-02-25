"use strict"

// var tabs = chrome.tabs;
// for (var i = 0; i < tabs.length; i++) {
// 	var tab = tab[i];
// 	if (tab.url.startsWith("https://www.facebook.com")) {
// 		tabs.remove(i);
// 	}
// }
var hasAlertMessageSent = false;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.url.startsWith("https://www.facebook.com")) {
		if (!hasAlertMessageSent) {
			alert("Sorry, no more distraction!");
			hasAlertMessageSent = true;
		}
		
		chrome.tabs.remove(tab.id, function() {
			hasAlertMessageSent = false;
		});
	}
});

// chrome.tabs.onCreated.addListener(function(tab) {
// 	if (tab.url.startsWith("https://www.facebook.com")) {
// 		if (!hasAlertMessageSent) {
// 			alert("Sorry, no more distraction!");
// 			hasAlertMessageSent = true;
// 		}
// 		chrome.tabs.remove(tab.id);
// 		hasAlertMessageSent = false;
// 	}
// }, false)