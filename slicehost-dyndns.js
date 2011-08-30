var http = require('http');
var https = require('https');


// config stuff
var domain = "example.com";
var subdomain = "";
var password = "";
var api = "api.slicehost.com";

var client = http.createClient(80, 'mirmillo.com');
var request = client.request('GET', '/ip.php', {'host': 'mirmillo.com'});
request.end();

request.on('response', function (response) {
	response.setEncoding('utf8');
	response.on('data', function (chunk) {
		//send_ip(chunk);
		get_api(chunk);
	});
});

function send_ip(ip) {
	console.log(ip);

}

function get_api(ip) {
	
	var options = {
		host: api,
		port: 443,
		path: '/api.xml',
		headers: {
		//'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
		'Authorization': 'Basic ' + new Buffer(password).toString('base64')
		}         
	};

	request = https.get(options, function(res){
		var body = "";
		res.on('data', function(data) {
			body += data;
		});
		res.on('end', function() {
			console.log(body);
		})
		res.on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	});
}
