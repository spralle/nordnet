var Account = function(connector, accountNumber) {
	this._connector = connector;
	this._accountNumber = accountNumber;
}

Account.prototype.details = function() {
	return this._connector.get('/accounts/'+this._accountNumber);
};

Account.prototype.ledgers = function() {
	return this._connector.get('/accounts/'+this._accountNumber+'/ledgers');
};

Account.prototype.orders = function() {
	return this._connector.get('/accounts/'+this._accountNumber+'/ledgers');
};