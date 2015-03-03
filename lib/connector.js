var URL = require('url-parse');
var rp = require('request-promise');

var Connector = function(url, sessionKey) {
	this._url = makeSessionUrl(url, sessionKey);
}

Connector.prototype.get = function(part) {
	var url = this._url;
	if(part) {
		url += part;
	}
	return rp.get({url:url, headers: {
            accept: 'application/json'}}).then(JSON.parse);
}
Connector.prototype.post = function(part) {
	return rp.post({url:this._url+part, headers: {
            accept: 'application/json'}}).then(JSON.parse);
}

var makeSessionUrl = function(u, sessionKey) {
	var url = new URL(u);
	url.username = sessionKey;
	url.password = sessionKey;
	return url.toString();
}

module.exports = Connector;