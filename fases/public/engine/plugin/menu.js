/*
* Menu
* @Autor Cristiano Boell
*/
Menu = function (data) {
   this.create(data);
};
Menu.prototype.create = function (conf) {
         this.x        = conf.x;
         this.y        = conf.y;
         conf.index    = (conf.index>5) ? 5 : conf.index;
         this.soldier  = week.get('game').add.sprite(this.x-50,this.y-50, 'menu',conf.index);
         this.soldier.index        = conf.index;
         this.soldier.inputEnabled = true;
         this.soldier.events.onInputDown.add(menu.goClick, this); // click under soldier
}
Menu.prototype.kill = function () {
         this.soldier.kill();
}
function oMenu(){
  Tools.Class.apply(this, [0]);
  var list = [];
  var activity = false;
  var action  = function(a,b,c){console.log(a,b,c);};
  var author  = undefined;
  var name    = 'Menu';
  var _preload = function(){
      week.get('game').load.atlas('menu',  'map/img/menu/menu.png', 'map/menu.json');
  }
  var _new = function(data){
     list.push(new Menu(data));
  }
  var _clear = function(){
     for(i in list){
          list[i].kill();
     }
     for(i in list){
          for(i in list){
            if(!list[i].soldier.alive)
              list.splice(i,-1);
          }
     }
  }
  var _clearALL = function(){
     for(i in list){
        list[i].kill();
        list.splice(i,-1);
     }
  }
  var _getActivate = function(){
     return activity;
  }
  var _setActivate = function(bin){
       activity = bin;
     if(!bin)
       _clear();
  }
  var _setAction = function(a,b){
       action = a;
       author = b;
  }
  var _execAction = function(author,a,b){
       action(author,a,b);
  }
  //public's
  return {
      name  : 'Menu',
      start : function(a){ week.get('game') = a; },
      preload: function(){ _preload(); },
      create: function(){ },
      update: function(){},
      render: function(){},
      new: function(data){
           _new(data);
           return this;
      },
      clear: function(){
           _clearALL();
      },
      setAction: function(data,a){
           _setAction(data,a);
      },
      goClick: function(a,b){
           _execAction(author,a,b);
           _setActivate(false);
      },
      getActivate: function(){
           return _getActivate();
      },
      setActivate: function(){
         if(!_getActivate())
           _setActivate(true);
         else{
           _setActivate(false);
        }
      }
  };
}
var menu = new oMenu();
week.set('menu',menu);
