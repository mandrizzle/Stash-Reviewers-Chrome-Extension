var extensionStorage = (function() {
	'use strict';

	const REVIEWERS_KEY = 'stashplugin.groups_reviewers';
	const HIPCHAT_KEY = 'stashplugin.hipchat';
	const TEMPLATE_KEY = 'stashplugin.template';
	const NOTIFSTATE_KEY = 'stashplugin.notifstate';
	const NOTIFTYPE_KEY = 'stashplugin.notiftype';
	const REPOMAP_KEY = 'stashplugin.repomap';
	const FEATURES_KEY = 'stashplugin.features';

	var defaultFeatures = {
		reviewersgroup: true,
		prfilters: true,
		notifIcon: true,
		checkout: true,
		clickbranch: true,
		sticker: true,
		build: false,
		pa: true,
		forkorigin: true,
		prtemplate: true,
		prconflicts: true,
		checkversion: true
	};

	var cloudStorage = chrome.storage.sync;
	// missing api in firefox
	if(typeof chrome === 'undefined' || typeof chrome.storage === 'undefined' || typeof chrome.storage.sync === 'undefined') {
		var store = typeof chrome === 'undefined' && typeof browser !== 'undefined' ? browser : chrome;
		cloudStorage = typeof store !== 'undefined' ? store.storage.local : typeof storage !== 'undefined' ? storage.local : null;
		if (typeof cloudStorage === 'undefined') {
			throw 'No storage available';
		}
	}
	/**
		@method
		@memberof storage
		@see {@link https://developer.chrome.com/apps/storage#type-StorageArea|StorageArea.set}
	*/
	function saveGroups(string, callback) {
		var data = {};
		data[REVIEWERS_KEY] = string
		cloudStorage.set(data, callback);
	}
	function loadGroups(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				var groups = items[REVIEWERS_KEY];
				if(!groups) {
					$.get(chrome.extension.getURL('/js/default.json'), function(data) {
						callback(data);
					});
				}
				else {
					callback(groups);
				}

			}
		});
	}

	function loadTemplate(callback) {
		cloudStorage.get(null, function(items) {
			if (callback) {
				var template = items[TEMPLATE_KEY];
				if (!template) {
					$.get(chrome.extension.getURL('/js/template.txt'), function(data) {
						callback(data.replace("\r", '').split("\n"));
					});
				} else {
					callback(template);
				}
			}
		});
	}
	function saveTemplate(string, callback) {
		var data = {};
		data[TEMPLATE_KEY] = string.split('\n');
		cloudStorage.set(data, callback);
	}

	function loadHipChatUsername(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				callback(items[HIPCHAT_KEY]);
			}
		});
	}
	function saveHipChatUsername(string, callback) {
		var data = {};
		data[HIPCHAT_KEY] = string;
		cloudStorage.set(data, callback);
	}

	function loadNotificationState(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				callback(items[NOTIFSTATE_KEY]);
			}
		});
	}
	function saveNotificationState(string, callback) {
		var data = {};
		data[NOTIFSTATE_KEY] = string;
		cloudStorage.set(data, callback);
	}

	function loadNotificationType(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				callback(items[NOTIFTYPE_KEY]);
			}
		});
	}
	function saveNotificationType(string, callback) {
		var data = {};
		data[NOTIFTYPE_KEY] = string;
		cloudStorage.set(data, callback);
	}

	function loadRepoMap(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				callback(items[REPOMAP_KEY]);
			}
		});
	}
	function saveRepoMap(string, callback) {
		var data = {};
		data[REPOMAP_KEY] = string;
		cloudStorage.set(data, callback);
	}

	function loadFeatures(callback) {
		cloudStorage.get(null, function(items){
			if (callback) {
				callback(items[FEATURES_KEY] || defaultFeatures);
			}
		});
	}
	function saveFeatures(string, callback) {
		var data = {};
		data[FEATURES_KEY] = string;
		cloudStorage.set(data, callback);
	}

	return {
		saveGroups: saveGroups,
		loadGroups: loadGroups,
		loadTemplate: loadTemplate,
		saveTemplate: saveTemplate,
		loadHipChatUsername: loadHipChatUsername,
		saveHipChatUsername: saveHipChatUsername,
		loadNotificationState: loadNotificationState,
		saveNotificationState: saveNotificationState,
		loadNotificationType: loadNotificationType,
		saveNotificationType: saveNotificationType,
		loadRepoMap: loadRepoMap,
		saveRepoMap: saveRepoMap,
		loadFeatures: loadFeatures,
		saveFeatures: saveFeatures,
		notificationStates: {
			enable:'1',
			disable:'0'
		},
		notificationTypes: {
			all:'1',
			prAndMentioned:'0'
		},
		defaultFeatures: defaultFeatures
	};
})();
