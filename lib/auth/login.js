var fs = require('fs');
var ursa = require('ursa-purejs');
var rp = require('request-promise');
var URL = require('url-parse');
var NodeRSA = require('node-rsa');


var SERVICE = 'NEXTAPI';

var encryptAuthParameter = function(user, pass, keyfile) {
  var rsaPublic = fs.readFileSync(keyfile, 'ascii');
  var key = ursa.createPublicKey(rsaPublic, 'utf8');
  var keyRsa = new NodeRSA(rsaPublic);
  if (!key) {
    throw new Error('Key File Error');
  }

  var auth = new Buffer(user).toString('base64');
  auth += ':';
  auth += new Buffer(pass).toString('base64');
  auth += ':';
  auth += new Buffer('' + new Date().getTime()).toString('base64');
  console.log(auth);
  var enc =  key.encrypt(auth, 'utf8', 'base64', ursa.RSA_PKCS1_PADDING);

  console.log(enc.toString('base64'));
  console.log('NEW');
  console.log(keyRsa.encrypt(auth,'base64'));
  return keyRsa.encrypt(auth,'base64');
  //return enc.toString('base64');
}

var login = function(urlString, keyfile) {
	var url = new URL(urlString);
	var username = url.username;
	var password = url.password;
	console.log(url);

	var auth = encryptAuthParameter(username, password, keyfile);
	// post JSON
	var jsonData = {
		service: SERVICE,
		auth: auth
	};
	console.log(urlString+"/login");
	//urlString = 'https://api.test.nordnet.se/next/2';

	return rp.post({url:urlString+"/login",       headers: {
            accept: 'application/json'
        }}).form({auth:auth, service:SERVICE}).catch(console.error);
}

module.exports = login;