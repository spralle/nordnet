var Promise = require('bluebird');
var request = require('request-promise');

var login = require('./auth/login');
var FeedManager = require('./feeds/feed_manager');

var Session = function(url, keyfile) {
	this._url = url;
	this._keyfile = keyfile;
	this._sessionKey = "NOT CONNECTED";
	this._feedSource = {};
}

Session.prototype.connect = function(callback) {
	return this.login();
};

Session.prototype.login = function() {
	var self = this;
	return login(this._url, this._keyfile).then(function(response){
//		console.log(response);
		self._sessionKey = response.session_key;
		self._feeds = new FeedManager({public:response.public_feed, private:response.private_feed}, self);
		return self;
	});
};

Session.prototype.feeds = function(feedName) {
	return this._feeds.get(feedName);
};



module.exports = Session;