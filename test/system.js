var should = require('should');
var _ = require('lodash');

var NN = require('..');
var config = require('../config/config');
describe('System', function() {
	describe('#system', function() {
		it('should have property system_running', function(done) {
			NN.connect(config.url, config.keyfile).then(function(session) {
				return session.system();
			}).then(function(system) {
				system.system_running.should.not.be.undefined;
				done();
			}).catch(function(err) {
				done(err);
			});
		});
	});
});