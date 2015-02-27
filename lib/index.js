var Promise = require('bluebird');
var Session = require('./session');

var NN = {};
NN.connect = function(url, keyfile, callback) {
	var session = new Session(url, keyfile);
	return session.connect(callback);
}


module.exports = NN;