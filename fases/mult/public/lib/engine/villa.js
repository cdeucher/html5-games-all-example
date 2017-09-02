/*
* Menu
* @Autor Cristiano Boell
*/
Villa = function (data) {
   this.create(data);
};
Villa.prototype.create = function (conf) {
    this.dono    = conf.dono;
    this.villa   = conf.villa;
    this.db      = (conf.db == undefined)? false: conf.db;
    this._id     = conf._id;
    this.soldier = game.add.sprite(conf.x, conf.y, (this.db)?'villa_human':'villa_orda', 0);
    this.soldier.inputEnabled = true;
    this.soldier.dono = conf.dono;
    spritesLayer.add(this.soldier);
  if(!this.db){
    this.soldier.events.onInputDown.add(villa_imput, this);
    game.camera.x = conf.x-200;
    game.camera.y = conf.y-200;     
  }
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
  var _update = function(data){
     _socket.emit('server_update_villa',data);
  }
  var _create = function(data){

  }
  var _get_villa = function(){
      return {'orda':_orda,'centuria':_centuria};
  }
  var _set_group = function(soldier,user){
    if(soldier.dono == user){
       _centuria[soldier._id] = new Villa(soldier);
    }else{
       _orda[soldier._id]     = new Villa(soldier);
    }
  }
  var _update_group = function(soldier){
    if(soldier.dono == userx){
        //letter.set('people',soldier.cost.people);
    }
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
      update: function(a){
           _update(a);
      },
      update_group: function(a){
           _update_group(a);
      },
      remove: function(a){
           _remove(a);
      },
      get_villa: function(){
           tmp =_get_villa();
           return tmp;
      },
      clear: function(){
           _clear();
      }
  };
}
