/*
* Walls
* @Author Cristiano Boell
*/
Walls = function() {
};
Walls.prototype.update = function(list){
};
Walls.prototype.kill = function () {
   this.alive = false;
   this.soldier.kill();
};
Walls.prototype.render = function(){
   week.get('game').debug.body(this.soldier);
};
function oWalls(){
  Tools.Class.apply(this, [0]);
  var _conf   = undefined;
  var _create = function(a,b,conf){
      group = (b == 1) ? week.get('xmen').create_orda : week.get('xmen').create_centuria;//week.get('game').add.group();
      group.enableBody      = true;
      group.physicsBodyType = Phaser.Physics.ARCADE;
      map.createFromObjects(conf.obj, a, conf.img, 0, true, false, group);
      for(i = 0; i < group.children.length; i++){
        if(group.getAt(i)._id == undefined){
          group.getAt(i)._id   = 'walls'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
          group.getAt(i).index = i;
          group.getAt(i).life  = 75;
          group.getAt(i).armor = 0.25;
          group.getAt(i).inputEnabled = true;
         if(conf.action != undefined)
            group.getAt(i).events.onInputDown.add(conf.action, this);
        } 
      }
  }
  var _gokill = function(_id){
    group = _query(_id);
    for(i = 0; i < group.children.length; i++){
      if(group.getAt(i).alive){
        if(group.getAt(i)._id  ==  _id){
           week.get('fire').new(group.getAt(i).x,group.getAt(i).y);
           group.getAt(i).kill();
        }
      }
    }
  }
  var _query = function(_id){
      for(i = 0; i < week.get('xmen').create_orda.children.length; i++){
        if(week.get('xmen').create_orda.getAt(i)._id  ==  _id)
         return week.get('xmen').create_orda;
      }
      return week.get('xmen').create_centuria;
  }
  var _atak = function(war){ //{_id:this._id,enemy_id:this.atk_enemy,force:this.force,dono:this.dono}
      group = _query(war.enemy_id);
      for(i = 0; i < group.children.length; i++){
        if(group.getAt(i).alive){
           if(group.getAt(i)._id  ==  war.enemy_id){
              group.getAt(i).life -=  (war.force - group.getAt(i).armor); //damage
              //console.log('damage',_centuria.getAt(i).life,war.force , _centuria.getAt(i).armor);
              return {x:group.getAt(i).x,get_healt:group.getAt(i).life};
           }
        }else{
          //console.log(_centuria.getAt(i).x,_centuria.getAt(i).y,'killed');
          return {x:group.getAt(i).x,get_healt:0};
        }
      }
    return {x:0,get_healt:0};
  }
  var _get = function(a){
      if(a == 'centuria')
        return {centuria:week.get('xmen').create_centuria,orda:week.get('xmen').create_orda,own:a};
      else
        return {centuria:week.get('xmen').create_orda,orda:week.get('xmen').create_centuria,own:a};
  }
  //public's
  return {
      name    : 'Walls',
      start   : this.start,
      preload : this.preload,
      clear   : this.clear,
      conf    : function(a){ _conf = a; return this; },// case obj and img are not standard
      new_centuria : function(a){ _create(a,0,_conf); return this; },
      new_orda : function(a){ _create(a,1,_conf); return this; },
      create  : this.create,
      update  : this.update,
      atak    : _atak,
      get     : _get,
      render  : this.render,
      gokill  : _gokill,
  }
}
var walls = new oWalls();
week.set('walls',walls);
