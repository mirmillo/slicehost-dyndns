var http = require('http');
var https = require('https');
var util = require('./util');

// config stuff
var domain = "example.com";
var subdomain = "";
var password = "";
var api = "api.slicehost.com";

// get the requesting IP from mirmillo.com
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
		body = util.trim(body);
		console.log("response "+body);
		get_api(body);
	})
	res.on('error', function(e) {
		console.log("Got error: " + e.message);
	});
});

// send the ip to Slicehost DNS
function send_ip(ip) {
	console.log("send_api "+ip);

	var record = "{‘record_type’:'A', ‘zone_id’:88621, ‘name’:'dixie.mirmillo.com', ‘data’:"+ip+"}";
	console.log(record);

}

// proof of concept that we can talk to slicehost api
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
			send_ip(ip);
		})
		res.on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	});
}
