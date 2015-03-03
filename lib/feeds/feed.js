var EventEmitter = require('events').EventEmitter;
var util = require('util');

var tls = require('tls');
var Promise = require('bluebird');
var _ = require('lodash');

var Feed = function(session, source, sessionKey) {
	this._session = session;
	this._source = source;
	this._sessionKey = sessionKey;
	this._client = null;
	this._connected = false;
};

util.inherits(Feed, EventEmitter);

function formatFeedCmd(cmd, args) {
  return JSON.stringify({
    cmd: cmd,
    args: args
  }) + '\n';
}

Feed.prototype.connect = function(callback) {
	if(this._connected) {
		return Promise.resolve(this).nodeify(callback);
	}
	var self = this;
	return new Promise(function(resolve, reject) {
		self._client = tls.connect(self._source.port, self._source.hostname, function () {
	    self._client.setNoDelay(true);
	    self._client.setTimeout(10000);
	    self._send(
		    'login', {
		      session_key: self._sessionKey,
		      service: 'NEXTAPI'
	    });	    	
	    self._onConnect();
	    resolve(self);
	  }).on('data', function () {
	  	self._onData.apply(self, arguments);
	  }).on('end', function() {
	  	self._onEnd.apply(self, arguments);
	  }).on('error', function() {
	  	self._onError.apply(self, arguments);
	  });

	}).nodeify(callback);
};

Feed.prototype.disconnect = function() {
	if(this._connected) {
		this._connected = false;
		this._client.end();
		this._client = null;
	}
};

Feed.prototype._emit = function() {
	var args = Array.prototype.slice.call(arguments);
	var event = args[0];
	var eventArgs = args.slice(1);
	this.emit(arguments);
	this.emit('all', event, eventArgs);
};

Feed.prototype._onConnect = function() {
    this._emit('connected');
};

Feed.prototype._onEnd = function() {
	this._emit('disconnected');
}

Feed.prototype._onData = function(data) {
	this._emit('data');
}


Feed.prototype._send = function(commandName, payload) {
	var cmd = formatFeedCmd(commandName, payload);
	this._client.write(cmd);
};

Feed.prototype.subscribePriceTick = function(instrument, market) {
	return this.subscribe('price', instrument, market);
}

Feed.prototype.unsubscribePriceTick = function(instrument, market) {
	return this.unsubscribe('price', instrument, market);
}

Feed.prototype.subscribeOrderDepth = function(instrument, market) {
	return this.subscribe('depth', instrument, market);
}

Feed.prototype.unsubscribeOrderDepth = function(instrument, market) {
	return this.unsubscribe('depth', instrument, market);
}

Feed.prototype.subscribeTrades = function(instrument, market) {
	return this.subscribe('trades', instrument, market);
}

Feed.prototype.unsubscribeTrades = function(instrument, market) {
	return this.unsubscribe('trades', instrument, market);
}

Feed.prototype.subscribeTradingStatus = function(instrument, market) {
	return this.subscribe('trading_status', instrument, market);
}

Feed.prototype.unsubscribeTradingStatus = function(instrument, market) {
	return this.unsubscribe('trading_status', instrument, market);
}

Feed.prototype.subscribeIndex = function(indicator, source) {
	return this.subscribe('indicator', indicator, source);
}
Feed.prototype.unsubscribeIndex = function(indicator, source) {
	return this.unsubscribe('indicator', indicator, source);
}

Feed.prototype.subscribeNews = function(source) {
	return this.subscribe('news', undefined, undefined, source);
}
Feed.prototype.unsubscribeNews = function(source) {
	return this.unsubscribe('news', undefined, undefined, source);
}

var _buildPayload = function(t,i,m,s) {
	var payload = {};
	if(!_.isUndefined(t)) {payload.t=t};
	if(!_.isUndefined(i)) {payload.i=i};
	if(!_.isUndefined(m)) {payload.m=m};
	if(!_.isUndefined(s)) {payload.s=s};
	return payload;
}

Feed.prototype.subscribe = function(t,i,m,s) {
	this._send('subscribe', _buildPayload(t,i,m,s));
};

Feed.prototype.unsubscribe = function(t,i,m,s) {
	this._send('unsubscribe', _buildPayload(t,i,m,s));
};


module.exports = Feed;
