var should = require('should');
var NN = require('..');
var Feed = require('../lib/feeds/feed');
var config = require('../config/config');

describe('Feeds', function() {
	describe('#login', function() {
		it('should login to feed successfully', function(done) {
			NN.connect(config.url, config.keyfile).then(function(session) {
				session.feeds('public').connect().then(function(feed){
					done();
				});
			}).catch(function(err) {
				done(err);
			});
		});
	});
	var verifyFeedCommand = function(done, c,t,i,m,s) {
		var feed = new Feed();
		feed._isConnected = true;
		feed._send = function(commandName, payload) {
			commandName.should.equal(c);
			payload.should.containDeep({t:t, m:m, i:i, s:s});
			done();
		};
		return feed;
	}

	describe('#subscribe/unsubscribe', function() {
		it('should send correct json for price subscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'subscribe', 'price', i, m).subscribePriceTick(i, m);
		});
		it('should send correct json for price unsubscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'unsubscribe', 'price', i, m).unsubscribePriceTick(i, m);
		});
		it('should send correct json for order depth subscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'subscribe', 'depth', i, m).subscribeOrderDepth(i, m);
		});
		it('should send correct json for order depth unsubscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'unsubscribe', 'depth', i, m).unsubscribeOrderDepth(i, m);
		});
		it('should send correct json for trades subscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'subscribe', 'trades', i, m).subscribeTrades(i, m);
		});
		it('should send correct json for trades unsubscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'unsubscribe', 'trades', i, m).unsubscribeTrades(i, m);
		});
		it('should send correct json for trading status subscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'subscribe', 'trading_status', i, m).subscribeTradingStatus(i, m);
		});
		it('should send correct json for trading status unsubscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'unsubscribe', 'trading_status', i, m).unsubscribeTradingStatus(i, m);
		});		
		it('should send correct json for index subscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'subscribe', 'indicator', i, m).subscribeIndex(i, m);
		});
		it('should send correct json for index unsubscribe', function(done) {
			var i="101", m=11;
			verifyFeedCommand(done, 'unsubscribe', 'indicator', i, m).unsubscribeIndex(i, m);
		});		
		it('should send correct json for news subscribe', function(done) {
			verifyFeedCommand(done, 'subscribe', 'news', undefined, undefined, 2).subscribeNews(2);
		});
		it('should send correct json for news unsubscribe', function(done) {
			verifyFeedCommand(done, 'unsubscribe', 'news', undefined, undefined, 2).unsubscribeNews(2);
		});		
	});
});
