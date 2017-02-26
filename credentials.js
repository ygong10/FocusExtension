"use strict"
/* From Firebase Google Chrome tutorial */
function initApp() {
  // Listen for auth state changes.
  // [START authstatelistener]
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
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign out';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

			// api handles existing users
			api.createNewUserData(uid, email);

			buildUrlControllerView(uid);

      // [END_EXCLUDE]
    } else {
      // Let's try to get a Google auth token programmatically.
      // [START_EXCLUDE]
      document.getElementById('quickstart-button').textContent = 'Sign-in with Google';
      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      document.getElementById('quickstart-account-details').textContent = 'null';
      // [END_EXCLUDE]
    }
    document.getElementById('quickstart-button').disabled = false;
  });
  // [END authstatelistener]

  document.getElementById('quickstart-button').addEventListener('click', startSignIn, false);
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
  // Request an OAuth token from the Chrome Identity API.
  chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
    if (chrome.runtime.lastError && !interactive) {
      console.log('It was not possible to get a token programmatically.');
    } else if(chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else if (token) {
      // Authrorize Firebase with the OAuth Access Token.
      var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // The OAuth token might have been invalidated. Lets' remove it from cache.
        if (error.code === 'auth/invalid-credential') {
          chrome.identity.removeCachedAuthToken({token: token}, function() {
            startAuth(interactive);
          });
        }
      });
    } else {
      console.error('The OAuth Token was null');
    }
  });
}

/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('quickstart-button').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}

window.onload = function() {
  initApp();
};

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
			urlControllerView.appendChild(inputUrlBox);
			urlControllerView.appendChild(addUrlButton);
			urlControllerView.appendChild(viewUrlsButton);

			var mainContainer = document.getElementById("main-container");
			mainContainer.appendChild(urlControllerView);

			addUrlButton.addEventListener("click", function() {
				logic.addUrl(inputUrlBox.value);
				inputUrlBox.value = "";
			});

			viewUrlsButton.addEventListener("click", function(uid) {
				var urls = api.getUserData(uid).restricted_urls;
				var urlsContainer = document.createElement("div");
				urlsContainer.textContent = urls;
				urlControllerView.appendChild(urlsContainer);
			});
}