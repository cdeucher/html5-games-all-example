/*
* Supply
* @Autor Cristiano Boell
*/
var Supplies = function (conf) {
    this.create(conf);
};
Supplies.prototype.create = function (conf) {
      this.dono    = conf.dono;
      this.db      = (conf.db == undefined)? false: conf.db;
      this._id     = conf._id;
      this.soldier = {};
      this.alive   = true;
      this.healt   = 500;
      this.soldier.dono = conf.dono;
      this.IcanHIT = true; // this object is supplie, not soldier
}
Supplies.prototype.update = function () {

};
Supplies.prototype.damage = function (force) {
     this.healt -= force;
};
Supplies.prototype.get_healt = function () {
     return this.healt;
};
Supplies.prototype.kill = function () {

};
Supplies.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;

};

function oSupplies(conf){
  var _socket    = conf.socket;
  var _centuria  = [];
  var _orda      = [];
  var list       = [];

  var _start = function(data){
     _socket.emit('server_set_supplies',data)
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
          console.log(" SuppliesKill "+_orda[i]._id);
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
