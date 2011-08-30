var http = require('http');

var client = http.createClient(80, 'mirmillo.com');
var request = client.request('GET', '/ip.php', {'host': 'mirmillo.com'});
request.end();

request.on('response', function (response) {
	response.setEncoding('utf8');
	response.on('data', function (chunk) {
		send_ip(chunk);
	});
});

function send_ip(ip) {
	console.log(ip);
}
