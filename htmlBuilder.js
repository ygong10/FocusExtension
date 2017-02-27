"use strict";
var viewUrlsButtonClicked = false;

var buildUrlControllerView = function(uid) {
	var urlControllerView = document.createElement("div");
	var inputUrlBox = document.createElement("input");
	var addUrlButton = document.createElement("button");
	var viewUrlsButton = document.createElement("button");

	addUrlButton.id = "add-url-button";
	addUrlButton.className = "btn btn-primary";
	addUrlButton.textContent = "Add URL";

	inputUrlBox.placeholder = "https://www.facebook.com/";
	
	viewUrlsButton.id = "view-res-urls-button";
	viewUrlsButton.className = "btn btn-primary";
	viewUrlsButton.textContent = "View All URLS";

	urlControllerView.id = "url-controller-view";
	urlControllerView.appendChild(inputUrlBox);
	urlControllerView.appendChild(addUrlButton);
	urlControllerView.appendChild(viewUrlsButton);

	addUrlButton.addEventListener("click", function() {
		var urlValue = inputUrlBox.value;
		logic.addUrl(uid, inputUrlBox.value);
		var urlsContainer = document.getElementById("restricted-urls-container");

		if (urlsContainer) {
			if (urlsContainer.textContent === "No Urls Set") {
				urlsContainer.textContent = "";
			}
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
				logic.removeUrl(row, uid, urlName).then(function() {
				});
			});
		}
		inputUrlBox.value = "";
	});

	viewUrlsButton.addEventListener("click", function() {
		if (!viewUrlsButtonClicked) {
			buildUrlList(urlControllerView, uid);		
			viewUrlsButtonClicked = true;
			viewUrlsButton.textContent = "Stop Viewing";
		} else {
			viewUrlsButton.textContent = "View All URLS";
			document.getElementById("restricted-urls-container").remove();
			viewUrlsButtonClicked = false;
		}
	});

	var mainContainer = document.getElementById("main-container");
	mainContainer.appendChild(urlControllerView);	
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
				let row = document.createElement("div");
				let urlContainer = document.createElement("div");
				urlContainer.textContent = restricted_urls[i];

				let removeButton = document.createElement("button");
				removeButton.textContent = "Remove";

				row.appendChild(urlContainer);
				row.appendChild(removeButton);

				removeButton.addEventListener("click", function() {
					var urlName = urlContainer.textContent;
					logic.removeUrl(row, uid, urlName).then(function() {
					});
				});
				urlsContainer.appendChild(row);
				
			}
		}
		chrome.extension.sendMessage({data: data["restricted_urls"]}, function(response) {
			// Do something?
		});
		button.appendChild(urlsContainer);
	});
};