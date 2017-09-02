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
*   LIBS
*/
var db        = require('./lib/mongo');
var player    = require('./lib/oPlayer');
var villa     = require('./lib/oVilla');
var supplies  = require('./lib/oSupplies'); //16-07
var groups    = require('./lib/group');
var rooms     = require('./lib/oRoom'); //15-07
var port      = require('./public/conf'); //27-07

var people = {};

var createRoom = function(client,db,room){
    if(people[room] == undefined)
       people[room] = {};
}
socket.on("connection", function (client) {
    rooms.find(client, db);

    client.on('ping', function() {
        client.emit('pong');
    });
    client.on("join", function(name,room){
        client.join(room);  //14-06
        client.room = room; //14-06
        console.log("connected ",name," - ",room);

        createRoom(client,db,client.room);
        people[client.room][client.id] = name;
        console.log('Rooms:',people);

        client.broadcast.to(client.room).emit("update", room+" - "+name + " has joined the server.");//update others
        client.emit("update", name+" - You has joined the server.");//update you
        rooms.set(client, db, name, people,{name:room,player:name}); //force create of rooms  //15-07
        //client.emit("client_function",cli_letter);//update you
    });
    client.on("disconnect", function(){
      if(client.room != undefined){
        tmp_remove =  people[client.room][client.id];
        client.broadcast.to(client.room).emit("update", tmp_remove + " has left the server.");
        client.broadcast.to(client.room).emit("gokill", tmp_remove);
        client.broadcast.to(client.room).emit("villakill", tmp_remove);
        client.broadcast.to(client.room).emit("suppliekill", tmp_remove);
        delete people[client.room][client.id];
        player.delete_soldier(client,db,tmp_remove,false);
        villa.delete_villa(client,db,tmp_remove,false);
        rooms.delete(client,db,tmp_remove); //15-07
        supplies.delete_supplies(client,db,tmp_remove,false); //16-07
        client.leave(client.room); //14-06
      }
    });
    client.on("logout", function(){
      if(client.room != undefined){
        tmp_remove =  people[client.room][client.id];
        client.broadcast.to(client.room).emit("update", tmp_remove + " has left the server.");
        client.broadcast.to(client.room).emit("gokill", tmp_remove);
        client.broadcast.to(client.room).emit("villakill", tmp_remove);
        client.broadcast.to(client.room).emit("suppliekill", tmp_remove);
        delete people[client.room][client.id];
        player.delete_soldier(client,db,tmp_remove,false);
        villa.delete_villa(client,db,tmp_remove,false);
        rooms.delete(client,db,tmp_remove); //15-07
        supplies.delete_supplies(client,db,tmp_remove,false); //15-07
        client.leave(client.room); //14-06
      }
    });
    client.on("force_clear", function(name,room){
      console.log(' all cleaning');
      villa.clear(db);
      supplies.clear(db);
      rooms.clear(db);
      player.clear(db);
      for(i in people[client.room]){
        delete people[client.room][i];
      }
      client.emit("client_clear_all",'ok');
    });
    /*
    *  players
    */
    client.on('server_get_soldier', function () {
      if(client.room != undefined)
       player.get_soldier(client,db,people);
    });
    client.on('server_set_soldier', function (soldier) {
      if(client.room != undefined)
       player.set_soldier(client,db,soldier,people,groups);
    });
    client.on('server_update_remote', function (soldier) {
      if(client.room != undefined)
      client.broadcast.to(client.room).emit("client_update_remote",soldier);//update other players
    });
    client.on('server_atk_to', function (data) {
      if(client.room != undefined){
        console.log('server_atk_to',data);
        client.broadcast.to(client.room).emit("client_atk_to",data);//update other players
        client.emit("client_atk_to",data);//update other players
      }
    });
    client.on('server_move_to', function (data) {
      if(client.room != undefined){
        console.log('server_move_to',data);
        client.broadcast.to(client.room).emit("client_move_to",data);//update other players
        client.emit("client_move_to",data);//update other players
      }
    });
    client.on('server_collision_to', function (data) {
      if(client.room != undefined){
        console.log('server_collision_to',data);
        client.broadcast.to(client.room).emit("client_collision_to",data);//update other players
        client.emit("client_collision_to",data);//update other players
      }
    });
    client.on('server_kill_soldier', function (data) {
      if(client.room != undefined){
        (data.IcanHIT != undefined)
        ?  supplies.delete_supplies(client,db,false,data)   // delete database
        :  player.delete_soldier(client,db,false,data);   // delete database
        client.broadcast.to(client.room).emit("client_kill_to",data);//
        client.emit("client_kill_to",data);//update other players
      }
    });
    /*
    *  villa
    */
    client.on('server_get_villa', function () {
      if(client.room != undefined)
       villa.get_villa(client,db,people);
    });
    client.on('server_set_villa', function (soldier) {
      if(client.room != undefined)
       villa.set_villa(client,db,soldier,people);
    });
    client.on('server_update_villa', function (data) {
      if(client.room != undefined)
        villa.update(client,db,data);
    });
    /*
    *  supplie
    */
    client.on('server_get_supplies', function () {
      if(client.room != undefined)
       supplies.get_supplies(client,db,people);
    });
    client.on('server_set_supplies', function (soldier) {
      if(client.room != undefined)
       supplies.set_supplies(client,db,soldier,people);
    });
});

ipaddress = process.env.OPENSHIFT_NODEJS_IP || '';
port      = process.env.OPENSHIFT_NODEJS_PORT || port;
server.listen(port,ipaddress);
