var should = require('should');
var _ = require('lodash');

var NN = require('..');
var config = require('../config/config');
describe('Accounts', function() {
	describe('#get all accounts', function() {
		it('Returns a list of accounts that the user has access to', function(done) {
			NN.connect(config.url, config.keyfile).then(function(session) {
				return session.accounts.all();
			}).then(function(accounts) {
				accounts.length.should.not.equal(0);
				done();
			}).catch(function(err) {
				done(err);
			});
		});
	});
});