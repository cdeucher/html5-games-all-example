  var supplies,text,cursors;
  var socket = io.connect(connection+':'+port, {resource: 'A/socket.io', 'force new connection': true});
  var userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
  var rooms   = 'x3'+Math.floor(Math.random() * 100 + 1);
  var romanos = new oSpiN({game:game,socket:socket});
  var domo    = new oMenu();
  var home    = new oVilla({socket:socket});
  var supplie = new oSupplies({socket:socket});
  var letter  = new oLetter();
  var mini    = new oMini();
  var side    = 0;
  socket.on('connect', function () {
      logme("socket connected");
      join();
  });
  socket.on('rooms', function (a) {
      rooms(a);
  });
  socket.on('update', function (data) {
      logme(data);
  });
  socket.on('login', function (user,people,villa) {
      logme('User:'+user+' - Autenticado');
    if(user == userx){
      yy = (villa == 1) ? 200 : 600 ;//Math.floor(Math.random() * 200+ 1);
      xx = (villa == 1) ? 200 : 2300 ; //Math.floor(Math.random() * (game.world.bounds.width-100) + 1);
      letter.create({name:'side',msg:villa});
      home.start({x:xx,y:yy,dono:userx,room:rooms,villa:villa,cost:{people:letter.get('people')}});
      letter.create({name:'guest',x:(game.camera.width / 2),y:40,msg:'Player:',sub:userx});
      create_controll();
    }
  });
  socket.on('client_two', function (user,people,villa) {
      logme('client_two');
  });
  socket.on('guest', function (user,people,villa) {
      logme('Obervador:'+user);
      letter.create({name:'guest',x:(game.camera.width / 2),y:40,msg:'Observador'});
      create_controll();
  });
  /*
  *  Soldiers
  */
  socket.on('gokill', function (dono) {
      logme('gokill : '+dono);
      romanos.remove(dono);
  });
  socket.on('client_get_soldier', function (data) {
      romanos.set_group(data,userx);
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
       ? supplie.kill_to(socket,data)
       : romanos.kill_to(socket,data);
  });
  /*
  *  Villa
  */
  socket.on('client_get_villa', function (data) {
      home.set_group(data,userx);
  });
  socket.on('client_update_villa', function (data) {
      home.update_group(data);
  });
  socket.on('villakill', function (dono) {
      home.remove(dono);
  });
  /*
  *  Supplies
  */
  socket.on('client_get_supplies', function (data) {
      supplie.set_group(data,userx);
  });
  socket.on('suppliekill', function (dono) {
      supplie.remove(dono);
  });
  /*
  *  Actions
  */
  function logme(data){
    msg = "";
    if(!isObject(data))
      msg = data;
    else{
      for(i in data){
        msg += ","+data[i];
      }
    }
    if(debug){
       letter.create({name:'warn',x:50, y:(game.camera.height / 2),msg:msg,sec:500});
       console.log('update',msg);
    }
  }
  function isObject(val) {
      return (typeof val === 'object');
  }
  function join(){
    romanos.clear();
    home.clear();
    supplie.clear();
    letter.clear();
  }
  function login(a){
     if(a == undefined){
       rooms   = 'Rooms'+Math.floor(Math.random() * 100 + 1);
     }else{
       a = $(a).find('.panel-heading').html().split(':');
       rooms   = a[0];
     }
      join();
      letter.create({name:'people',x:20,y:20,msg: 130 ,sub:' : People'});// initial points
      letter.create({name:'fps'   ,x:20,y:40,msg:'___',sub:' : FPS'});
      letter.create({name:'latency',x:20,y:60,msg:'___',sub:' : Latency'});
      socket.emit('logout');
      logme("Autenticando no servidor!");
      socket.emit('join', userx, rooms);
      socket.emit('server_get_soldier');
      socket.emit('server_get_villa');
      socket.emit('server_get_supplies');
      modal(false);
  }
  function modal(){
      $('#menu').hide();
      $('#game').show();
  }
