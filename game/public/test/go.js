var userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
var game    = {user:userx};
var home    = {};
var supplie    = {};
var romanos    = {};
var oSpiN   = require("./oSpin.js");
var oSoldier = require("./oSoldier.js");
var oVilla  = require("./oVilla.js");
var oSupplies  = require("./oSupplies.js");
/*
*  Client-server
*/
var io = require('socket.io-client'),
socket = io.connect('http://localhost');
socket.on('connect', function () { console.log("socket connected"); });

socket.on('update', function (data) {
  msg = "";
  if(!isObject(data))
    msg = data;
  else{
    for(i in data){
      msg += ","+data[i];
    }
  }
  console.log('update',msg);
});
socket.on('login', function (user,id) {
     console.log('ok logou');
     home.start({dono:userx,room:'room'});
});
socket.on('client_get_soldier', function (data) {
     romanos.set_group(data,userx);
});
socket.on('client_get_villa', function (data) {
     console.log('villa saved -',data);
     home.set_group(data,userx);
});
socket.on('client_get_supplies', function (data) {
     console.log('supplies saved -',data);
     supplie.set_group(data,userx);
});
/*
*  Actions
*/
function go(){
  romanos = new oSpiN({game:game,socket:socket});
  home = new oVilla({game:game,socket:socket});
  supplie = new oSupplies({game:game,socket:socket});
  socket.emit('join', userx, 'room');
  socket.emit('server_get_soldier');
  socket.emit('server_get_villa');
  socket.emit('server_get_supplies');
}
function set(c){
  supplie.start({x:c.x,y:c.y,dono:userx,room:'room'});
  romanos.add(userx).add(userx);
}
function isObject(val) {
    return (typeof val === 'object');
}
//start
go();
set({x:400,y:300});
set({x:1600,y:500});
  console.log(supplie.get());
