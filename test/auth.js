var should = require('should');
var NN = require('..');

var TEST_URL ="https://user:password@api.test.nordnet.se/next/2";
var KEY_FILE = "keys/NEXTAPI_TEST_public.pem";

describe('Auth', function() {
	describe('#login', function() {
		it('should login successfully', function(done) {
			NN.connect(TEST_URL, KEY_FILE).then(function(session) {
				done();
			}).catch(function(err) {
				done(err);
			});
		});
	});
});
