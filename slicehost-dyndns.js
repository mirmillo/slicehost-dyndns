var http = require('http');
var https = require('https');
var util = require('./util');

// config stuff
var password = "";
var api = "api.slicehost.com";


// http get_ip options
var httpopt = {
	host: 'mirmillo.com',
	port: 80,
	path: '/ip.php'
};


// https api options
var httpsopt = {
	host: api,
	port: 443,
	path: '/api.xml',
	headers: {
	//'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
	'Authorization': 'Basic ' + new Buffer(password).toString('base64')
	}         
};

// get the ip from mirmillo.com
request = http.get(httpopt, function(res){
	var body = "";
	res.on('data', function(data) {
		body += data;
	});
	res.on('end', function() {
		body = util.trim(body);
		console.log("response "+body);
		//get_api(body);
		send_ip(body);
		//get_slices(body);
	})
	res.on('error', function(e) {
		console.log("Got error: " + e.message);
	});
});

// send the ip to Slicehost DNS
function send_ip(ip) {
	console.log("send_api "+ip);

	var record = "record[data]="+ip;

	console.log(record);

	// https api options
	var httpsopt = {
		host: api,
		port: 443,
		path: '/records/775805.xml', // this id is only for dixie.mirmillo.com - would be nice if this figured out what the record id was first
		method: 'PUT',
		headers: {
		//'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
		'Authorization': 'Basic ' + new Buffer(password).toString('base64'),
		'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': record.length
		}         
	};

	var req = https.request(httpsopt, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(record);
	req.end();

}

// verify that we can get the slices
function get_slices(ip) {
	console.log("send_api "+ip);

	// https api options
	var httpsopt = {
		host: api,
		port: 443,
		path: '/slices.xml',
		headers: {
		//'Authorization': 'Basic ' + new Buffer(uname + ':' + pword).toString('base64')
		'Authorization': 'Basic ' + new Buffer(password).toString('base64')
		}         
	};

	var req = https.request(httpsopt, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	req.end();
}

// proof of concept that we can talk to slicehost api
function get_api(ip) {
	console.log("get_api "+ip);	

	request = https.get(httpsopt, function(res){
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
