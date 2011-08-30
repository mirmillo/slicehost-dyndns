var http = require('http');
var https = require('https');


// config stuff
var domain = "example.com";
var subdomain = "";
var password = "";
var api = "api.slicehost.com";

	var options = {
		host: 'mirmillo.com',
		port: 80,
		path: '/ip.php'
	};

	request = http.get(options, function(res){
		var body = "";
		res.on('data', function(data) {
			body += data;
		});
		res.on('end', function() {
			console.log("response "+body);
			get_api(body);
		})
		res.on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	});


function send_ip(ip) {
	console.log("send_api "+ip);

}

function get_api(ip) {
	console.log("get_api "+ip);	
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
