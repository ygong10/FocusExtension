
var viewUrlsButtonClicked = false;

var buildUrlControllerView = function(uid) {
	var urlControllerView = document.createElement("div");
	var inputUrlBox = document.createElement("input");
	var addUrlButton = document.createElement("button");
	var viewUrlsButton = document.createElement("button");

	addUrlButton.id = "add-url-button";
	addUrlButton.className = "btn btn-primary";
	addUrlButton.textContent = "Add URL";

	viewUrlsButton.id = "view-res-urls-button";
	viewUrlsButton.className = "btn btn-primary";
	viewUrlsButton.textContent = "View All Restricted URLS";

	urlControllerView.id = "url-controller-view";
	urlControllerView.appendChild(inputUrlBox);
	urlControllerView.appendChild(addUrlButton);
	urlControllerView.appendChild(viewUrlsButton);

	var mainContainer = document.getElementById("main-container");
	mainContainer.appendChild(urlControllerView);

	addUrlButton.addEventListener("click", function() {
		var urlValue = inputUrlBox.value;
		logic.addUrl(uid, inputUrlBox.value);
		var urlsContainer = document.getElementById("restricted-urls-container");

		if (urlsContainer) {
			var row = document.createElement("div");
			var urlContainer = document.createElement("div");
			urlContainer.textContent = urlValue;

			var removeButton = document.createElement("button");
			removeButton.textContent = "Remove";

			row.appendChild(urlContainer);
			row.appendChild(removeButton);
			urlsContainer.appendChild(row);

			removeButton.addEventListener("click", function() {
				var urlName = urlContainer.textContent;
				logic.removeUrl(row, uid, urlName);
				removeButton.remove();
			});
		}
		inputUrlBox.value = "";
	});

	viewUrlsButton.addEventListener("click", function() {
		if (!viewUrlsButtonClicked) {
			buildUrlList(urlControllerView, uid);
			viewUrlsButtonClicked = true;
		} else {
			document.getElementById("restricted-urls").remove();
			viewUrlsButtonClicked = false;
		}
	});
};


var buildUrlList = function(button, uid) {
	api.getUserData(uid).then(function(data) {
		var urlsContainer = document.createElement("div");
		urlsContainer.id = "restricted-urls-container";
		var restricted_urls = data.restricted_urls;

		if (restricted_urls === undefined) {
			urlsContainer.textContent = "No Urls Set";
		} else {
			for (var i  = 0; i < restricted_urls.length; i++) {
				var row = document.createElement("div");
				var urlContainer = document.createElement("div");
				urlContainer.textContent = restricted_urls[i];

				let removeButton = document.createElement("button");
				removeButton.textContent = "Remove";

				row.appendChild(urlContainer);
				row.appendChild(removeButton);
				urlsContainer.appendChild(row);

				removeButton.addEventListener("click", function() {
					var urlName = urlContainer.textContent;
					logic.removeUrl(row, uid, urlName);
					console.log("removing");
					removeButton.remove();
				});
			}
		}
		button.appendChild(urlsContainer);
	});
};