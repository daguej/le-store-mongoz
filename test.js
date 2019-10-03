var leStoreMongoz = require('./index'),
	tester = require('greenlock-store-test'),
	mongodb = require('mongodb');

mongodb.MongoClient.connect('mongodb://127.0.0.1/mongoz-test', function(err, mongoClient) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	var db = mongoClient.db('mongoz-test'),
		accounts = db.collection('accounts'),
		certificates = db.collection('certificates');

	accounts.drop().catch(noop);
	certificates.drop().catch(noop);


	var store = leStoreMongoz.create(accounts, certificates);

	tester.test(store).then(function() {
		console.log('PASS');
		process.exit(0);
	}, function(err) {
		console.error(err);
		process.exit(1);
	});

});

function noop() {}
