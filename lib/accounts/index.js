module.exports = function(connector) {
	var conn = function() {
		return connector.get('/accounts')
	}

	conn.getAccount = function(account) {
		console.log(account);
	}
	return conn;
}
