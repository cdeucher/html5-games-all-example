var socket  = io.connect(connection+':'+port);
var game    = {};
var user    = 'bot_'+Math.floor(Math.random() * 100 + 1);
var home    = new oVilla({socket:socket});
var supplie = new oSupplies({socket:socket});
var romanos = new oSpiN({socket:socket});
var go_villa = 0;
var go_party = 0;
var xx =0;
var yy =0;
socket.on('update', function (msg) {
    logme('log : '+msg);
});
/*
*  Villa
*/
socket.on('client_get_villa', function (data) {
    home.set_group(data,user);
});
socket.on('villakill', function (dono) {
    home.remove(dono);
});
/*
*  Supplies
*/
socket.on('client_get_supplies', function (data) {
    supplie.set_group(data,user);
});
socket.on('suppliekill', function (dono) {
    supplie.remove(dono);
});
/*
*  Soldiers
*/
socket.on('gokill', function (dono) {
    logme('gokill : '+dono);
    romanos.remove(dono);
});
socket.on('client_get_soldier', function (data) {
    romanos.set_group(data,user);
});
socket.on('client_update_remote', function (data) {
    romanos.update_remote(data);
});
socket.on('client_atk_to', function (data) {
    romanos.atk_to(socket,data);
});
socket.on('client_move_to', function (data) {
    romanos.move_to(socket,data);
});
socket.on('client_collision_to', function (data) {
    romanos.collision_to(socket,data);
});
socket.on('client_kill_to', function (data) {
    (data.IcanHIT != undefined)
     ?supplie.kill_to(socket,data)
     :romanos.kill_to(socket,data);
});
/*
*  login
*/
socket.on('login', function (user,people,villa) {
    logme('login:'+user);
    go_party = (villa == 1) ? 2 : 1 ;
    yy = (villa == 1) ? 200 : 200 ;//Math.floor(Math.random() * 200+ 1);
    xx = (villa == 1) ? 200 : 1400 ; //Math.floor(Math.random() * (game.world.bounds.width-100) + 1);
});
socket.on('client_clear_all', function (data) {
    logme('clear - ',data);
    location.reload();
});
function preload(){};
function create(){};
function update(){};
