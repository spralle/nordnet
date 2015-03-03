var fs = require('fs');
var rp = require('request-promise');
var URL = require('url-parse');
var NodeRSA = require('node-rsa');


var SERVICE = 'NEXTAPI';

var encryptAuthParameter = function(user, pass, keyfile) {
  var rsaPublic = fs.readFileSync(keyfile, 'ascii');
  var keyRsa = new NodeRSA(rsaPublic, {encryptionScheme:{scheme:"pkcs1"}});

  var auth = new Buffer(user).toString('base64');
  auth += ':';
  auth += new Buffer(pass).toString('base64');
  auth += ':';
  auth += new Buffer('' + new Date().getTime()).toString('base64');
  return keyRsa.encrypt(auth,'base64');
}

var login = function(urlString, keyfile) {
	var url = new URL(urlString);
	var username = url.username;
	var password = url.password;

	var auth = encryptAuthParameter(username, password, keyfile);
	// post JSON
	var jsonData = {
		service: SERVICE,
		auth: auth
	};

	return rp.post({url:urlString+"/login", headers: {
            accept: 'application/json'
        }}).form({auth:auth, service:SERVICE}).then(JSON.parse);
}

module.exports = login;