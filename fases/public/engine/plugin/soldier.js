/*
* Soldier
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
function oSpiN(data){
    Tools.Class.apply(this, [0]);
    //privates
    var _render = false;
    var _alive  = true;
    var _centuria  = [];
    var _orda      = [];
    var _preload = function(){
          week.get('game').load.atlas('soldier', 'map/img/player/soldier1.gif',  'map/soldier.json');
          week.get('game').load.atlas('knight',  'map/img/player/knight.png',    'map/knight.json');
          week.get('game').load.atlas('archer',  'map/img/player/archer.png',    'map/archer.json');
          week.get('game').load.image('arrow',   'map/img/player/arrow.png');
          //balista
          week.get('game').load.atlas('balistax', 'map/img/player/balista2.png', 'map/balista.json');
          week.get('game').load.image('balista_arrow', 'map/img/player/balista_arrow2.png');
    }
    var _create = function(){
    }
    var _new = function(soldier){
         if(soldier.dono == week.get('cli').username){
             tmp=week.get('romanos');
             cap = new tmp(soldier);
             _centuria[cap._id] = cap;
           if(cap.cap == undefined) week.get('mini').new(soldier,cap);
         }else{
           tmp=week.get('germanos');
           cap = new tmp(soldier);
           _orda[cap._id] = cap;
         }
         if(cap.cap == undefined) // only soldier not captain
           _set_group(cap);//create group of the soldier
    }
    var _set_group = function(soldier){
         newSoldier = {};
         newSoldier.cap  = soldier._id;
         newSoldier.dono = soldier.dono;
         newSoldier.type = soldier.type;
         newSoldier.db   = soldier.db;
       for(xi = 1; xi < soldier.legion; xi++){ //lines
         for(ji = 1; ji < 4; ji++){  //colls
             newSoldier.base = {x:soldier.base.x+(ji*50), y: (soldier.base.y+(xi*30))};
          if(soldier.troops == 'others') //the group of soldiers have same type
             newSoldier.type = (ji <2) ? 1 : 2; //it this line form groups of soldiers, remove this line and all soldier will be only one type of soldiers
             newSoldier.y    = soldier.y+(xi*30);
             newSoldier.x    = soldier.x+(ji*50);
             newSoldier.indicey    = xi;
             newSoldier.indicex    = ji;
             _new(newSoldier);
         }
       }
    }
    var _update = function(){
      for(i in _centuria){
         _centuria[i].update(week.get('soldier').get_orda(),week.get('walls').get('centuria'));
      }
      for(i in _orda){
         _orda[i].update(week.get('soldier').get_centuria(),week.get('walls').get('orda'));
      }
    }
    var _render = function(){
      if(_render == true)
      for(i in _centuria){
        _centuria[i].render();
      }
    }
    var _remove = function(dono){
      for(i in _orda){
        if(_orda[i].dono == dono){
            _orda[i].goKill();
        }
      }
    }
    var _move_to = function(data){
        if(_orda[data._id] != undefined){
           _orda[data._id].move_to(data);
        }else
        if(_centuria[data._id] != undefined){
           //group = (_orda[data.enemy_id] != undefined) ?  _orda : _wall.orda;
           _centuria[data._id].move_to(data);//,group);
        }
    }
    var _to_go = function(a,b,group){
        cap = undefined;
        if(group[a._id] != undefined)
        if(group[a._id].cap == undefined ){  // it is captan
              cap = group[a._id];
        }else{
          for(i in group){
            if(group[i]._id == group[a._id].cap){
              cap = group[i];
            }
          }
        }
        if(cap != undefined){
          for(i in group){
            if(group[i].cap == cap._id){
              x = (b.x+(group[i].indicex*50));
              y = (b.y+(group[i].indicey*30));
               _move_to({_id:group[i]._id,x:x,y:y});
            }
          }
          _move_to({_id:cap._id,x:b.x,y:b.y});
          return true;
        }else
          return false;
    }
    var _check_collision = function(){
      for(i in _centuria){
        _centuria[i].check_collision(_orda);
      }
      for(i in _orda){
        _orda[i].check_collision(_centuria);
      }
    }
    var _to_restart = function(a,b){
        cap = undefined;
        if(b[a._id].cap == undefined ){  // it is captan
              cap = b[a._id];
              cap.capx = a._id;
        }else{
          for(i in _centuria){
            if(b[i]._id == b[a._id].cap){
              cap = b[i];
              cap.capx = b[i]._id;
            }
          }
        };
        if(cap == undefined){
             cap = b[a._id];
             cap.capx = a._id
        }
        for(i in b){
          if(b[i].cap == cap.capx){
            x = (cap.soldier.x+(b[i].indicex*50));
            y = (cap.soldier.y+(b[i].indicey*80));
            b[i].move_to({_id:b[i]._id,x:x,y:y});
          }
        }
    }
    var _stop = function(a,b){
      cap = undefined;
      if(b[a._id] != undefined)
      if(  b[a._id].cap == undefined ){  // it is captan
            cap = a._id;
          if(b[i].atk_enemy == undefined)
            b[i].stop();
      }else{
        cap = b[a._id].cap;
        for(i in b){
          if(b[a._id].cap == cap && b[i].atk_enemy == undefined){
            b[i].stop();
          }
        }
      }
    }
    // remove all soldiers
    var _clear = function(){
      for(i in _centuria){
        _centuria[i].goKill();
        _centuria.splice(i,-1);
      }
      for(i in _orda){
        _orda[i].goKill();
        _orda.splice(i,-1);
      }
      _orda = [];
      _centuria = [];
    }
    //public's
    return {
        name   : 'Soldier',
        start  : this.start,
        preload: function(){ _preload(); },
        create : function(){ _create(); },
        clear  : function(){ _clear(); },
        render : this.render,
        new    : function(a){
             return _new(a);
        },
        get_centuria: function(){
             return _centuria;
        },
        get_orda: function(){
             return _orda;
        },
        to_restart: function(a){
            if(_orda[a._id] != undefined){
               return _to_restart(a,_orda);
            }else
            if(_centuria[a._id] != undefined){
               return _to_restart(a,_centuria);
            }
        },
        to_go: function(a,b){
            if(_orda[a._id] != undefined){
               return _to_go(a,b,_orda);
            }else
            if(_centuria[a._id] != undefined){
               return _to_go(a,b,_centuria);
            }
        },
        to_stop: function(a){
            if(_orda[a._id] != undefined){
               return _stop(a,_orda);
            }else
            if(_centuria[a._id] != undefined){
               return _stop(a,_centuria);
            }
        },
        update: function(){
             return _update();
        },
        render: function(){
             return _render();
        },
        remove: function(data){
             return _remove(data);
        }
    };
}
var soldier_imput = function(a,b){
  if(!week.get('menu').getActivate()){
     x = week.get('game').input.activePointer.worldX;
     y = week.get('game').input.activePointer.worldY;
     week.get('menu').new({x:x,y:y,index:1})
                     .new({x:x+90,y:y,index:0})
                     .new({x:x+90,y:y+90,index:2});
     week.get('menu').setAction(soldier_move,a);
  }
};
var soldier_move = function(author,a,b){
    if(a.index == 1)
      week.set('move',{action:1,soldier:author});
    if(a.index == 0)
      week.get('soldier').to_restart(author);
    if(a.index == 2){
          a= week.get('soldier').get_orda();
          b= week.get('soldier').get_centuria();
          if(a[author._id] != undefined){
             console.log('orda',a[author._id]);
          }else
          if(b[author._id] != undefined){
             console.log('centuria',b[author._id]);
          }
    }
};
function move(a,b){  //click map         
    if(week.get('move').action == 1){
      week.get('soldier').to_go(week.get('move').soldier,{x:week.get('game').input.activePointer.worldX,y:week.get('game').input.activePointer.worldY});
      week.set('move',{action:0});
    }
    //push
    if(week.get('push_move').action == 1){
      week.get('push').to_go(week.get('push_move').soldier,{x:week.get('game').input.activePointer.worldX,y:week.get('game').input.activePointer.worldY});
      week.set('push_move',{action:0});
    }
}
var soldier = new oSpiN();
week.set('soldier',soldier);
week.set('move',{action:0});
