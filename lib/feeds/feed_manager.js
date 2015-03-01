var Feed = require('./feed');

var FeedManager = function(sources, session) {
	this._sources = sources;
	this._session = session;
	this._feeds = {};
}

FeedManager.prototype.get = function(feedName) {
	var feed = this._feeds[feedName];
	if(feed === undefined) {
		if(this._sources[feedName]=== undefined) {
			throw new Error('invalid feedname: '+ feedName);
		}
		feed = new Feed(this._session, this._sources[feedName], this._session._sessionKey);
	}
	return feed;
};

module.exports = FeedManager;