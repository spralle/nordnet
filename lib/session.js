var Promise = require('bluebird');
var request = require('request-promise');

var login = require('./auth/login');


var Session = function(url, keyfile) {
	this._url = url;
	this._keyfile = keyfile;
}

Session.prototype.connect = function(callback) {
	return this.login();
};

Session.prototype.login = function() {
	return login(this._url, this._keyfile).then(console.dir).catch(console.error);
};

module.exports = Session;