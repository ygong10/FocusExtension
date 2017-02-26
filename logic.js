var logic = (function() {
	var addUrl = function(uid, url) {
		var data = api.getUserData(uid).then(function(data) {
			var restricted_urls = data["restricted_urls"];
			if (restricted_urls === undefined) {
				data["restricted_urls"] = [url];
			} else {
				data["restricted_urls"].push(url);
			}

			// Send message to background script
			chrome.extension.sendMessage({data: data["restricted_urls"]},
				function(response) {
					// Do something?
				});
			api.updateUserData(uid, data);			
		});
	}

	var removeUrl = function(button, uid, url) {
		return api.getUserData(uid).then(function(data) {
			var restricted_urls = data["restricted_urls"];
			if (restricted_urls === undefined) {
				return;
			} else {
				for (var i = 0; i < restricted_urls.length; i++) {
					var restricted_url = restricted_urls[i];
					if (restricted_url === url) {
						data["restricted_urls"].splice(i, 1);
						console.log("removed");
						button.remove();
						chrome.extension.sendMessage({data: data["restricted_urls"]},
							function(response) {
								// Do something?
							});
							api.updateUserData(uid, data);
						break;
					}
				}
			}			
		});
	};

	return {
		addUrl: addUrl,
		removeUrl: removeUrl
	}
})();
