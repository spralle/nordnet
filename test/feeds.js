var should = require('should');
var NN = require('..');
var config = require('../config/config');

describe('Feeds', function() {
	describe('#login', function() {
		it('should login to feed successfully', function(done) {
			this.timeout(150000);
			NN.connect(config.url, config.keyfile).then(function(session) {
				session.feeds('public').connect().then(function(feed){

					done();
				});
			}).catch(function(err) {
				done(err);
			});
		});
	});
});
