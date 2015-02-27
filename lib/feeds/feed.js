var tls = require('tls');
var Promise = require('bluebird');

var Feed = function(source, sessionKey) {
	this._source = source;
	this._sessionKey = sessionKey;
};

function formatFeedCmd(cmd, args) {
  return JSON.stringify({
    cmd: cmd,
    args: args
  }) + '\n';
}

Feed.prototype.connect = function(callback) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var client = tls.connect(self._source.port, self._source.hostname, function () {
	    client.setNoDelay(true);
	    client.setTimeout(10000);

	    console.log('Connected to feed');
	    console.log( formatFeedCmd('login', {
		      session_key: self._sessionKey,
		      service: 'NEXTAPI'}));
	    console.log(self);
		    client.write(
			    formatFeedCmd('login', {
			      session_key: self._sessionKey,
			      service: 'NEXTAPI'
		    }));	    	

/*	    setTimeout(function() {
	      client.write(formatFeedCmd('subscribe', {
	        t: 'price',
	        i: 30,
	        m: '1869'
	      }));

		    },100);
*/

	  }).on('data', function (d) {
	    console.log(d.toString());
//	    resolve(this);
	  });
	});
};

Feed.prototype.subscribe = function(first_argument) {
	// body...
};

module.exports = Feed;
