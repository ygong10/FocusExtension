"use strict";

var database = firebase.database();

var api = (function() {
	var userApiEndpoint = 'users/';

	var getUserData = function(uid) {
		var userRef = database.ref(userApiEndpoint + uid);
		return userRef.once('value')
			.then(function(snapshot) {
				return snapshot.val();
			});
	}

	var createNewUserData = function(uid, email) {
		var userRef = database.ref(userApiEndpoint + uid);

		checkIfExist(userRef).then(function(exists) {
			if (!exists) {
					var data = {	
											"email": email,
											"restricted_urls": [],
											"statistics": {}
										};
				userRef.set(data);
			}
		});
	}

	var updateUserData = function(uid, data) {
		var userRef = database.ref(userApiEndpoint + uid);
		userRef.update(data);
	}

	var checkIfExist = function(ref) {
		return ref.once('value')
			.then(function (snapshot) {
				return snapshot.exists();
			});
	}

	return {
		getUserData : getUserData,
		createNewUserData: createNewUserData,
		updateUserData: updateUserData
	}
})();
