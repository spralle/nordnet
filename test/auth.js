var should = require('should');
var NN = require('..');
var config = require('../config/config');

describe('Auth', function() {
	describe('#login', function() {
		it('should login successfully', function(done) {
			NN.connect(config.url, config.keyfile).then(function(session) {
				session.isConnected().should.equal(true);
				done();
			}).catch(function(err) {
				done(err);
			});
		});
	});
});
