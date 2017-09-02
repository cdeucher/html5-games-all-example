/*
* Boot
* @Autor Cristiano Boell
*/
Boot = function (room) {
  this.socket  = io.connect(connection+':'+port, {resource: 'B/socket.io', 'force new connection': true});
  this.userx   = 'x3'+Math.floor(Math.random() * 100 + 1);
  this.rooms   = room;
  this.supplies= [];
  this.soldiers= 0;
  this.romanos = new oSpiN({game:{},socket:this.socket});
  this.domo    = new oMenu();
  this.home    = new oVilla({socket:this.socket});
  this.supplie = new oSupplies({socket:this.socket});

  this.rede();
};
Boot.prototype.get_supplies = function () {
    return this.supplies;
}
Boot.prototype.create = function () {
  this.home.start({x:2300, y: 200,dono:this.userx,room:this.rooms,villa:2,cost:{people:130}});
  this.supplie.start({x:1800,y:300,dono:this.userx,room:this.rooms,IcanHIT:true});
  this.supplie.start({x:1000,y:500,dono:this.userx,room:this.rooms,IcanHIT:true});
  this.supplie.start({x:2000,y:600,dono:this.userx,room:this.rooms,IcanHIT:true});
  this.supplie.start({x:1500,y:500,dono:this.userx,room:this.rooms,IcanHIT:true});
};
Boot.prototype.set = function (data) {
  if(data.dono == this.userx){
    if(data.IcanHIT)
        this.supplies[data._id] = data;
    else{
        this.soldiers++;
    }
  }
};
Boot.prototype.kill_to = function (data) {
  if(data.IcanHIT)
    delete this.supplies[data._id];
  else
    this.soldiers--;
};
Boot.prototype.login = function () {
    this.socket.emit('join', this.userx, this.rooms);
};
Boot.prototype.logout = function () {
    this.socket.emit('logout');
    clearInterval(boot.vv);
};
Boot.prototype.clear = function (){
    logme('clear');
    this.socket.emit('force_clear','xx','aa');
    location.reload();
};
Boot.prototype.go = function(qtd,type){
    supply = this.supplies;
    number = (game.device.desktop) ? 40 : 20 ;
    logme('Number : '+this.soldiers+' - Limmit:'+number);
  if(this.soldiers <= number){
    for(i in supply){
      for(xi = 1; xi < qtd; xi++){
        for(ji = 1; ji < 3; ji++){
            this.romanos.add({x:supply[i].x+(ji*50),y:supply[i].y+(xi*30),
                              indicey:xi,indicex:ji,type:type,dono:this.userx,boot:true,
                              base:{x:supply[i].x-Math.floor(Math.random() * 700),
                                    y:supply[i].y-Math.floor(Math.random() * 200)}});
         }
       }
    }
  }
};
Boot.prototype.rede = function () {
    this.socket.on('update', function (data) {
        logmex(data);
    });
    this.socket.on('login', function (data) {
        logmex("boot login");
        boot.create();
        boot.vv = setInterval(function(){
          logmex("boot new troops");
              boot.go(2,4);
              boot.go(2,1);
        },30000);
    });
    this.socket.on('connect', function () {
        logmex("socket connected");
    });
    this.socket.on('client_kill_to', function (data) {
        boot.kill_to(data);
    });
    this.socket.on('client_get_supplies', function (data) {
        boot.set(data);
    });
    this.socket.on('client_get_soldier', function (data) {
        boot.set(data);
    });
    this.socket.on('client_function', function (a) {
        //console.log(a);
        //tmp = eval(a);
        //console.log(tmp);
        //tmp();
    });
}
function logmex(data){
  msg = "";
  if(!isObject(data))
    msg = data;
  else{
    for(i in data){
      msg += ","+data[i];
    }
  }
  if(debug)
     console.log('update',msg);
}
function isObject(val) {
    return (typeof val === 'object');
}
