/*
* Supply
* @Autor Cristiano Boell
*/
var Supplies = function (conf) {
    this.create(conf);
    this.bar();
};
Supplies.prototype.create = function (conf) {
      this.dono    = conf.dono;
      this.db      = (conf.db == undefined)? false: conf.db;
      this._id     = conf._id;
      this.soldier = game.add.sprite(conf.x, conf.y-10, (this.db)?'supplie_eforte':'supplie_forte', 1);//villa_human':'villa_orda', 1);
      this.soldier.inputEnabled = true;
      this.alive   = true;
      this.healt   = 500;
      this.clicle  = 40;//seconds
      this.soldier.dono = conf.dono;
      this.IcanHIT = true; // this object is supplie, not soldier
      this.action  = function(){};
      spritesLayer.add(this.soldier);
    if(!this.db){
      this.soldier.events.onInputDown.add(villa_imput, this);
    }
}
Supplies.prototype.bar = function(){
      bmd = game.add.bitmapData(80, 4);
      bmd.ctx.beginPath();
    	bmd.ctx.rect(0, 0, 80, 4);
    	bmd.ctx.fillStyle = '#00685e';
    	bmd.ctx.fill();
      this.progress = game.add.sprite(this.soldier.x+40, this.soldier.y+25, bmd);
      this.progress.anchor.set(0.5);
};
Supplies.prototype.update = function () {
   if(this.alive == true){
       this.progress.width -= (this.progress.width/this.clicle);
      if(this.progress.width <= 1){
        letter.set('people',(letter.get('people')+10));
        this.progress.width = 80;
      }
   }
};
Supplies.prototype.damage = function (force) {
     this.healt -= force;
};
Supplies.prototype.get_healt = function () {
     return this.healt;
};
Supplies.prototype.kill = function () {
     this.soldier.kill();
};
Supplies.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
     this.progress.kill();
};

function oSupplies(conf){
  var _socket    = conf.socket;
  var _centuria  = [];
  var _orda      = [];
  var list       = [];

  var _start = function(data){
     _socket.emit('server_set_supplies',data);
  }
  var _create = function(data){

  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Supplies(soldier);
    }else
       _orda[soldier._id]     = new Supplies(soldier);
  }
  var _remove = function(dono){
    for(i in _orda){
      if(_orda[i].dono == dono){
          _orda[i].goKill();
          logme(" SuppliesKill "+_orda[i]._id);
      }
    }
  }
  var _kill_to = function(socket,data){
      if(_orda[data._id] != undefined)
         _orda[data._id].goKill();
      if(_centuria[data._id] != undefined)
         _centuria[data._id].goKill();
  }
  var _clear = function(){  // remove all soldiers
    for(i in _centuria){
      _centuria[i].goKill();
    }
    for(i in _orda){
      _orda[i].goKill();
    }
    _orda = [];
    _centuria = [];
  }
  var _update = function(){
    for(i in _centuria){
      _centuria[i].update();
    }
    for(i in _orda){
      _orda[i].update();
    }
  }
  //public's
  return {
      get_orda: function(){
           return _orda;
      },
      get_centuria: function(){
           return _centuria;
      },
      start: function(a){
           _start(a);
           return this;
      },
      create: function(a){
           _create(a);
           return this;
      },
      update: function(){
           _update();
      },
      set_group: function(a,b){
           _set_group(a,b);
      },
      remove: function(a){
           _remove(a);
      },
      kill_to: function(socket,data){
           return _kill_to(socket,data);
      },
      clear: function(){
           _clear();
      }
  };
}
