/*
* Menu
* @Autor Cristiano Boell
*/
Villa = function (data) {
   this.create(data);
};
Villa.prototype.create = function (conf) {
    this.dono    = conf.dono;
    this.db      = (conf.db == undefined)? false: conf.db;
    this._id     = conf._id;
    this.soldier = {};
    this.soldier.dono = conf.dono;
}
Villa.prototype.kill = function () {
         this.soldier.kill();
}
Villa.prototype.goKill = function(){
     this.alive = false;
     this.healt = 0;
     this.soldier.kill();
};

function oVilla(conf){
  var _socket    = conf.socket;
  var _centuria  = [];
  var _orda      = [];
  var list       = [];

  var _start = function(data){
     _socket.emit('server_set_villa',data);
  }
  var _create = function(data){

  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Villa(soldier);
    }else
       _orda[soldier._id]     = new Villa(soldier);
  }
  var _remove = function(dono){
    for(i in _orda){
      if(_orda[i].dono == dono){
          _orda[i].goKill();
          logme(" villaKill "+_orda[i]._id);
      }
    }
  }
  // remove all soldiers
  var _clear = function(){
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
      clear: function(){
           _clear();
      }
  };
}
