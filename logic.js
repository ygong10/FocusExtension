var logic = (function() {
	var addUrl = function(uid, url) {
		var data = api.getUserData(uid).then(function(data) {
			console.log(data);
			// data["uid"]["data"]["restricted_urls"].append(url);
			// api.updateUserData(data);
		});
	}

		return {
			addUrl: addUrl
		}
})();
