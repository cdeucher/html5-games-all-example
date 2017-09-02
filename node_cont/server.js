/*
*   Web Server
*/
var _static = require('node-static');
var file = new _static.Server('./public');
var server = require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        //responde as requisições
        file.serve(request, response);
    }).resume();
});
/*
*   Socket Server
*/
socket = require('socket.io').listen(server);
//socket.set('transports', [ 'websocket', 'xhr-polling' ]);
var request = require('request');
/*
*   CONF
*/
var port      = require('./public/conf'); //27-07
var cont      = 0;
var people    = {};

var createRoom = function(room){
    if(people[room] == undefined)
       people[room] = {};
}
socket.on("connection", function (client) {
    client.on("join", function(name,room){
        client.join(room);  //14-06
        client.room = room; //14-06
        console.log("connected ",name," - ",room);

        createRoom(client.room);
        people[client.room][client.id] = name;
        console.log('Rooms:',people);

        cont++;
        client.broadcast.to(client.room).emit("cont", cont);
        client.emit("cont", cont);
    });
    client.on("disconnect", function(){
      if(client.room != undefined){
        tmp_remove =  people[client.room][client.id];
        cont--;
        client.broadcast.to(client.room).emit("cont", cont);
        client.emit("cont", cont);
        console.log(tmp_remove + " has left the server.");
        delete people[client.room][client.id];
        client.leave(client.room); //14-06
      }
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || port;
server.listen(port,ipaddress);
