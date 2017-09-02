//================================screen
var fs = require('fs');
var exec_screen = require('./myscreen');
var _static = require('node-static');
var file = new _static.Server('../');
var options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};
// HTTPs server
var app = require('https').createServer(options, function(request, response) {
    request.addListener('end', function() {
        file.serve(request, response);
    }).resume();
});
var WebSocketServer = require('websocket').server;
new WebSocketServer({
    httpServer: app,
    autoAcceptConnections: false
}).on('request', exec_screen.onRequest);
 app.listen(7076);
