"use strict"

// Prevent alert from propagating up by using a boolean "lock"
var hasAlertMessageSent = false;
var restricted_urls = undefined;

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	restricted_urls = request.data;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (restricted_urls !== undefined) {
		for (var i = 0; i < restricted_urls.length; i++) {
			var restrict_url = restricted_urls[i];
			if (tab.url.startsWith(restrict_url) || tab.url.startsWith(restrict_url + "/")) {
				if (!hasAlertMessageSent) {
					alert("Focus! No distractions right now!");
					hasAlertMessageSent = true;
				}

				chrome.tabs.remove(tab.id, function() {
					hasAlertMessageSent = false;
				});
			}
		}
	}
});


