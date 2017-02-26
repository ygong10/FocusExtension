"use strict"

// Prevent alert from propagating up by using a boolean "lock"
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
