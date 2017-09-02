var express = require('express')
  , app = express(app)
  , server = require('http').createServer(app);

// serve static files from the current directory
app.use(express.static(__dirname));
/******************************************************
    EURECA
/******************************************************/
var clients = {};
var EurecaServer = require('eureca.io').EurecaServer;
var eurecaServer = new EurecaServer({allow:['update']});
eurecaServer.attach(server);

eurecaServer.onConnect(function (conn) {    
    console.log(' onConnect - New Client id=%s ', conn.id, conn.remoteAddress);	
    var remote = eurecaServer.getClient(conn.id);    	
    console.log(remote);
});

//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    console.log(' onDisconnect - Client disconnected ', conn.id);	
});

eurecaServer.exports.handleKeys = function (keys) {
	var conn = this.connection;
	remote.update(conn);
}

/******************************************************
    END - EURECA
/******************************************************/
server.listen(8000, function() {
            console.log('%s: Node server started on port ', Date(Date.now()), ' : ', 8000);
});
