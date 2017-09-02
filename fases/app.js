/*
*   Settings
*/
var conf = require('./conf/settings');
/*
*   Web Server
*/
var _static = require('node-static');
var file = new _static.Server('./public');
var server = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        //responde as requisições
        file.serve(request, response);    }).resume();
});
/*
*   Socket Server
*/
socket = require('socket.io').listen(server);

//socket.set('transports', [ 'websocket', 'xhr-polling' ]);
var request = require('request');
/*
*   Start Server
*/
ipaddress = process.env.OPENSHIFT_NODEJS_IP || conf.ip;
port      = process.env.OPENSHIFT_NODEJS_PORT || conf.port;
console.log(port,ipaddress);
server.listen(port,ipaddress);
