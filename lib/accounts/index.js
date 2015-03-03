var Account = require('./account');

var Accounts = function(connector) {
	this._connector = connector;
}

Accounts.prototype.all = function() {
	return this._connector.get('/accounts')
};

Accounts.prototype.get = function(accountNumber) {
	return new Account(this._connector, accountNumber);
};

module.exports = Accounts;