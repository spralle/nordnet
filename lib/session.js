var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Promise = require('bluebird');


var login = require('./auth/login');
var FeedManager = require('./feeds/feed_manager');
var Connector = require('./connector');

var accounts = require('./accounts')


var Session = function(url, keyfile) {
	this._url = url;
	this._sessionUrl = null;
	this._keyfile = keyfile;
	this._sessionKey = "NOT CONNECTED";
	this._feedSource = {};
	this._connector = null;
}

util.inherits(Session, EventEmitter);



Session.prototype.connect = function(callback) {
	return this.login();
};

Session.prototype.login = function() {
	var self = this;
	return login(this._url, this._keyfile).then(function(response){
		self._sessionKey = response.session_key;
		self._feeds = new FeedManager({public:response.public_feed, private:response.private_feed}, self);
		self._connector = new Connector(self._url, self._sessionKey);
		self.accounts = accounts(self._connector);
		return self;
	});
};

Session.prototype.isConnected = function() {
	return this._sessionKey !== undefined;
}

Session.prototype.feeds = function(feedName) {
	return this._feeds.get(feedName);
};

Session.prototype.system = function(callback) {
	return this._connector.get().nodeify(callback);
}


module.exports = Session;