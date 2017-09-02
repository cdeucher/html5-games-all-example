function oSpiN(data){
    //privates
    var _render = false;
    var _alive  = true;
    var _game   = {};
    var _socket = data.socket;
    var _centuria  = [];
    var _orda   = [];
    var _wall   = {};
    var _create = function(){

    }
    var _set_group = function(soldier,user){
      if(soldier.dono == user){
         cap = new Soldier(soldier,_game,_socket);
         _centuria[soldier._id] = cap;
         set_new_group(cap);//create group of the soldier
      }else
        _orda[soldier._id]     = new Soldier(soldier,_game,_socket);
    }
    var _add = function(soldier){
        _socket.emit('server_set_soldier',soldier);
    }
    var _check_collision = function(socket){
      for(i in _centuria){
        _centuria[i].check_collision(_orda,socket,_centuria);
      }
    }
    var _update = function(socket){
       _wall = {'orda':supplie.get_orda(),'centuria':supplie.get_centuria()};
      for(i in _centuria){
         obj = _centuria[i];
         obj.update(_orda,socket); //soldiers
         obj.update(_wall.orda,socket); //archer see walls
      }
    }
    var _render = function(){
      if(_render == true)
      for(i in _centuria){
        _centuria[i].render();
      }
    }
    var _update_remote = function(soldier){
      //  console.log('updating-',soldier);
      if(soldier != undefined)
      if(_orda[soldier._id] != undefined)
        _orda[soldier._id].update_remote(soldier,_centuria);
    }
    var _remove = function(dono){
      for(i in _orda){
        if(_orda[i].dono == dono){
            _orda[i].goKill();
            logme(" goKill "+_orda[i]._id);
            //_orda.splice(i,1); //remove in the array
        }
      }
    }
    var _atk_to = function(socket,data){
      if(_orda[data._id] != undefined){
         group = (_centuria[data.enemy_id] != undefined) ?  _centuria : _wall.centuria;
         _orda[data._id].atk_to(data,group);
      }
      if(_centuria[data._id] != undefined){
         group = (_orda[data.enemy_id] != undefined) ?  _orda : _wall.orda;
         _centuria[data._id].atk_to(data,group);
      }
    }
    var _move_to = function(socket,data){
      if(_orda[data._id] != undefined){
         group = (_centuria[data.enemy_id] != undefined) ?  _centuria : _wall.centuria;
         _orda[data._id].move_to(data,group);
      }else
      if(_centuria[data._id] != undefined){
         group = (_orda[data.enemy_id] != undefined) ?  _orda : _wall.orda;
         _centuria[data._id].move_to(data,group);
      }
    }
    var _collision_to = function(socket,data){
      if(_orda[data._id] != undefined){
         group = (_centuria[data.enemy_id] != undefined) ?  _centuria : _wall.centuria;
         _orda[data._id].collision_to(data,group);
      }
      if(_centuria[data._id] != undefined){
         group = (_orda[data.enemy_id] != undefined) ?  _orda : _wall.orda;
         _centuria[data._id].collision_to(data,group);
      }
    }
    var _kill_to = function(socket,data){
        if(_orda[data._id] != undefined)
           _orda[data._id].goKill();
        if(_centuria[data._id] != undefined)
           _centuria[data._id].goKill();
    }
    var _go = function(){
      for(i in _centuria){
        _centuria[i].soldier.x += 20;
      }
    }
    var set_new_group = function(soldier){
        // only soldier not captain
        //console.log(soldier);
       if(soldier.cap == undefined){
         //console.log('Iam captain');
         newSoldier = {};
         newSoldier.cap  = soldier._id;
         newSoldier.dono = soldier.dono;
         newSoldier.type = soldier.type;
         //console.log(newSoldier);
         for(xi = 1; xi < soldier.legion; xi++){
           for(ji = 1; ji < 3; ji++){
               newSoldier.base = {x:soldier.base.x+(ji*50), y: (soldier.base.y+(xi*30))};
               newSoldier.y    = soldier.y+(xi*30);
               newSoldier.x    = soldier.x+(ji*50);
               newSoldier.indicey    = xi;
               newSoldier.indicex    = ji;
               _socket.emit('server_set_soldier',newSoldier);
           }
         }
       }
    }
    var _to_go = function(a,b){
        cap = undefined;
        if( _centuria[a._id].cap == undefined ){  // it is captan
              cap = _centuria[a._id];
        }else{
          for(i in _centuria){
            if(_centuria[i]._id == _centuria[a._id].cap){
              cap = _centuria[i];
            }
          }
        }
        if(cap != undefined){
          for(i in _centuria){
            if(_centuria[i].cap == cap._id){
              x = (b.x+(_centuria[i].indicex*50));
              y = (b.y+(_centuria[i].indicey*30));
              socket.emit('server_move_to',{_id:_centuria[i]._id, x: x, y: y});
            }
          }
          socket.emit('server_move_to',{_id:cap._id, x: b.x, y: b.y});
        }
    }
    var _restart = function(a,b){
        cap = undefined;
        if(  _centuria[a._id].cap == undefined ){  // it is captan
              cap = _centuria[a._id];
        }else{
          for(i in _centuria){
            if(_centuria[i]._id == _centuria[a._id].cap){
              cap = _centuria[i];
            }
          }
        }
        if(cap != undefined){
          for(i in _centuria){
            if(_centuria[i].cap == cap._id){
              x = (cap.soldier.x+(_centuria[i].indicex*50));
              y = (cap.soldier.y+(_centuria[i].indicey*80));
              socket.emit('server_move_to',{_id:_centuria[i]._id, x: x, y: y});
            }
          }
       }
    }
    var _stop = function(a,b){
      cap = undefined;
      if(  _centuria[a._id].cap == undefined ){  // it is captan
            cap = _centuria[a._id];
            _centuria[i].stop();
      }else{
        for(i in _centuria){
          if(_centuria[i]._id == _centuria[a._id].cap){
            cap = _centuria[i];
            _centuria[i].stop();
          }
        }
      }
      if(cap != undefined){
        for(i in _centuria){
          if(_centuria[i].cap == cap._id){
            _centuria[i].stop();
          }
        }
     }
    }
    var _move = function(a){
      if(a>1)
      sprite.body.x = 800;
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
        create: function(){
             return _create();
        },
        add: function(data){
                    _add(data);
             return this;
        },
        set_group: function(data,user){
                    _set_group(data,user);
             return this;
        },
        get_centuria: function(){
             return _centuria;
        },
        get_orda: function(){
             return _orda;
        },
        update: function(socket){
             return _update(socket);
        },
        check_collision: function(socket){
             return _check_collision(socket);
        },
        atk_to: function(socket,data){
             return _atk_to(socket,data);
        },
        kill_to: function(socket,data){
             return _kill_to(socket,data);
        },
        update_remote: function(soldier){
             return _update_remote(soldier);
        },
        render: function(){
             return _render();
        },
        remove: function(data){
             return _remove(data);
        },
        move_to: function(socket,data){
             return _move_to(socket,data);
        },
        collision_to: function(socket,data){
             return _collision_to(socket,data);
        },
        go: function(){
             return _go();
        },
        to_go: function(a,b){
             return _to_go(a,b);
        },
        restart: function(a,b){
             return _restart(a,b);
        },
        stop: function(a,b){
             return _stop(a,b);
        },
        move: function(a){
             return _move(a);
        },
        clear: function(){
             return _clear();
        }
    };
}
