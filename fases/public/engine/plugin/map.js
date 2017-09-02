/*
* Menu
* @Autor Cristiano Boell
*/
Card = function (data) {
   this.create(data);
};
Card.prototype.create = function (conf) {
  switch (conf.type) {
    case 'soldier': this.soldier = week.get('game').add.sprite(conf.x,conf.y, 'soldier', 0); 
                    this.soldier.x += 10;
    break;

    case 'archer': this.soldier = week.get('game').add.sprite(conf.x,conf.y, 'archer', 0); 
                   this.soldier.x += 20;
    break;

    case 'knight': this.soldier = week.get('game').add.sprite(conf.x,conf.y, 'knight', 0);             
                   this.soldier.x += 10;
    break;

    case 'balista': this.soldier = week.get('game').add.sprite(conf.x,conf.y, 'balistax', 0);      
    break;    

    case 'shield':  this.soldier = week.get('game').add.sprite(conf.x-5,conf.y-10, 'shield_human', 0);      
    break;
  }
    this.soldier._id   = conf._id;
    this.soldier.type  = conf.type
    this.soldier.index = conf.index;
    this.soldier.paramns = conf.paramns;
    this.soldier.y    += 20;
    this.soldier.inputEnabled = true;

  if(conf.paramns.scale != undefined) 
    this.soldier.scale.setTo(conf.paramns.scale[0],conf.paramns.scale[1]);
  if(conf.paramns.fixed != undefined) 
    this.soldier.fixedToCamera = conf.paramns.fixed;
  if(conf.action != undefined)
    this.soldier.events.onInputDown.add(conf.action, this);

}
Card.prototype.kill = function () {
         this.soldier.kill();
}
function oMap(){
  Tools.Class.apply(this, [0]);
  var _cards = {0:'soldier',1:'archer',2:'knight',3:'balista'};
  var _list  = [];
  var _group = {c:[],g:[],s:[]};

  var _create = function(index_json){  //index_json : ID -Tiled of the object
        _group.s = week.get('game').add.group();
        _group.s.enableBody      = true;
        _group.s.physicsBodyType = Phaser.Physics.ARCADE;
        map.createFromObjects('soldiers', index_json, 'mold', 0, true, false, _group.s); 
        for(i = 0; i < _group.s.children.length; i++){
           _group.s.getAt(i).alpha =0;
        } 
        _group.c = week.get('game').add.group();
        _group.c.enableBody      = true;
        _group.c.physicsBodyType = Phaser.Physics.ARCADE;
        map.createFromObjects('obj_detail', index_json, 'mold', 0, true, false, _group.c); 
        for(i = 0; i < _group.c.children.length; i++){
           _group.c.getAt(i).alpha =0;
        }         
        _group.g = week.get('game').add.group();
        _group.g.enableBody      = true;
        _group.g.physicsBodyType = Phaser.Physics.ARCADE;
        map.createFromObjects('generals', index_json, 'mold', 0, true, false, _group.g);   
        for(i = 0; i < _group.g.children.length; i++){
           _group.g.getAt(i).alpha =0;
        }                 
  }
  var _proccess = function(a){
          _list[a._id] = new Card(a);
  }
  var _add_soldier = function(a){
        if(week.get('data').lvl.general != undefined){
          if(week.get('data').City[a.paramns.map].general[week.get('data').lvl.general].army.length < 7){
            week.get('data').City[a.paramns.map].general[week.get('data').lvl.general].army.push({dono:week.get('cli').username,start:false,type:a.paramns.type,x:8});
            _create_soldiers(a);
          } 
        }  
  } 
  var _remove_soldier = function(a){    
        if(week.get('data').lvl.general != undefined){           
          army = week.get('data').City[a.paramns.map].general[week.get('data').lvl.general].army;
          for (i in army){              
             if(army[i]._id == a.paramns._id){                         
                army.splice(i,1); 
             }  
          }
          _create_soldiers(a);
        }  
  }   
  var _create_card = function(a){

        for(i = 0; i < _group.c.children.length; i++){
           _group.c.getAt(i)._id   = 'cards'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
           _group.c.getAt(i).index = i;
           _group.c.getAt(i).type  = _cards[i]; 
           _group.c.getAt(i).alpha = 1;  
           _group.c.getAt(i).action = _add_soldier;      
           _group.c.getAt(i).paramns= {map:a,index:i,type:_cards[i],_id:_group.c.getAt(i)._id};
          if(week.get('data').City[a] != undefined) 
              if(week.get('data').City[a].cards.indexOf(_group.c.getAt(i).type) != -1) 
                  _proccess(_group.c.getAt(i));
        }     
  }
  var _create_general = function(a){
      
        if(week.get('data').City[a] != undefined) 
        for(i = 0; i < _group.g.children.length; i++){
          if(week.get('data').City[a]['general'][i] != undefined){
             _group.g.getAt(i)._id    = 'general'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
             _group.g.getAt(i).index  = i;
             _group.g.getAt(i).type   = 'shield';       
             _group.g.getAt(i).action = _create_soldiers;      
             _group.g.getAt(i).paramns= {map:a,'index':i,general:i,_id:_group.g.getAt(i)._id}; 
             week.get('data').City[a]['general'][i].action = _create_soldiers;    
             week.get('data').City[a]['general'][i].paramns= {map:a,'index':i,general:i,_id:_group.g.getAt(i)._id}; 
             week.get('data').City[a]['general'][i]._id    = _group.g.getAt(i)._id;
             week.get('data').City[a]['general'][i]['obj'] = _group.g.getAt(i);
             _proccess(_group.g.getAt(i));
          }
        }     
  }  
  var _create_soldiers = function(a){    
        _new(a.paramns.map);        
        if(a.paramns.general != undefined)week.get('data').lvl.general = a.paramns.index;

        if(week.get('data').City[a.paramns.map] != undefined){           
          for(i = 0; i < _group.s.children.length; i++){             
            if(week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general] != undefined){
                 if(week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general]['army'][i] != undefined){                
                   soldier = week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general]['army'][i];
                   _group.s.getAt(i)._id   = 'soldier'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
                   soldier._id             = _group.s.getAt(i)._id 
                   _group.s.getAt(i).index = i;
                   _group.s.getAt(i).type  = soldier.type; 
                   _group.s.getAt(i).alpha = 1; 
                   _group.s.getAt(i).action = _remove_soldier;      
                   _group.s.getAt(i).paramns= {map:a.paramns.map,'index':i,_id:_group.s.getAt(i)._id};                 
                   week.get('game').physics.enable(_group.s.getAt(i), Phaser.Physics.ARCADE);  
                   _group.s.getAt(i).body.enable = true;
                   _group.s.getAt(i).body.setSize(_group.s.getAt(i).width, 10, 0, 0);   
                   _proccess(_group.s.getAt(i));
                 }
            }
          } 
        }   
  }  
  var _create_bar = function(a){    
        _goKill();  
        _group.s = week.get('game').add.group();
        _group.s.enableBody      = true;
        _group.s.physicsBodyType = Phaser.Physics.ARCADE;
        map.createFromObjects('soldiers', 1098, 'mold', 0, true, false, _group.s); 
        for(i = 0; i < _group.s.children.length; i++){
           _group.s.getAt(i).alpha =0;
        }         
        if(week.get('data').City[week.get('data').lvl.Country] != undefined) {
          if(a.paramns.general != undefined)week.get('data').lvl.general = a.paramns.index;

          if(week.get('data').City[a.paramns.map] != undefined){                     
            for(i = 0; i < _group.s.children.length; i++){             
              if(week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general] != undefined){
                   if(week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general]['army'][i] != undefined){                                  
                     soldier = week.get('data').City[a.paramns.map]['general'][week.get('data').lvl.general]['army'][i];
                     _group.s.getAt(i)._id   = 'soldier'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
                     soldier._id             = _group.s.getAt(i)._id 
                     _group.s.getAt(i).index = i;
                     _group.s.getAt(i).type  = soldier.type;                    
                     _group.s.getAt(i).alpha = 1; 
                     _group.s.getAt(i).y     = week.get('game').camera.height - 80;
                     _group.s.getAt(i).x     = week.get('game').camera.x + i*60;                                    
                     //_group.s.getAt(i).action = _remove_soldier;      
                     //_group.s.getAt(i).paramns= {map:a.paramns.map,'index':i,_id:_group.s.getAt(i)._id};                 
                     week.get('game').physics.enable(_group.s.getAt(i), Phaser.Physics.ARCADE);  
                     _group.s.getAt(i).fixedToCamera = true;
                     _group.s.getAt(i).scale.setTo(0.7,0.7); 
                     _group.s.getAt(i).body.enable = true;
                     _group.s.getAt(i).body.setSize(_group.s.getAt(i).width, 10, 0, 0);  
                     _group.s.getAt(i).paramns = {scale:[0.7,0.7],fixed:true}; 
                     _proccess(_group.s.getAt(i));
                   }
              }
            } 
          }  
        }    
  }   
  var _new = function(a){      
      _goKill(); //clear
      _create_card(a);     
      _create_general(a);  
      week.get('letter').new({name:'city',x:920,y:40,msg:a}); 
  }
  /*--seleciona a fase
    --select the step
  */
  var _click = function(a,b){
        week.get('data').lvl.Country = a.key;  
        _new(a.key);                      
  }
  var _enter = function(){
        week.get('hamer').set(week.get('data').lvl.Country);
  }
  var _general = function(a,b){
   
  }  
  var _render_bar = function(){     
       if(_group.s.children != undefined) 
       for(i = 0; i < _group.s.children.length; i++){
          if(_group.s.getAt(i).alive == true && _group.s.getAt(i).alpha == 1){
            week.get('game').debug.body(_group.s.getAt(i));    
          }
       }   
  }
  var _goKill = function(){ 
       for(i = 0; i < _group.c.children.length; i++){
          _group.c.getAt(i).alpha =0;
       }        
       for(i = 0; i < _group.s.children.length; i++){
          _group.s.getAt(i).alpha =0;
       }        
       for(i in _list){
          _list[i].kill();
       }
       _list = [];       
       week.get('letter').kill('city');
  }
  //public's
  return {
      name    : 'map',
      new     : _new,
      action_click : _click,
      action_enter : _enter,
      action_general : _general,
      create_bar : _create_bar,
      start   : this.start,
      preload : this.preload,
      clear   : this.clear,
      create  : _create,
      kill    : _goKill,
      update  : this.update,
      render  : _render_bar,
  }
}
var mapx = new oMap();
week.set('map',mapx);
