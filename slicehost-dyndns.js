var http = require('http');

var ipurl = ('whatismyip.com');
var i = http.createClient(80, ipurl);

var ip = i.request('GET', ipurl, {'host':'whatismyip.com'});
console.log(ip);
ip.end();

ip.addListener('response', function (response) {
var body = '';

response.addListener('data', function(chunk) {
	body += chunk;
	});

//console.log(response);
//console.log(body);
});
