var http = require('http');
var fs = require('fs');

	var client = http.createClient(80, 'whatismyip.org');
	var request = client.request('GET', '/', {'host': 'www.whatismyip.org'});
	request.end();
	out = fs.createWriteStream('out');
	request.on('response', function (response) {
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			out.write(chunk);
		});
	});
