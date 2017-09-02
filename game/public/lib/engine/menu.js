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
         this.soldier  = game.add.sprite(this.x,this.y, 'battle',conf.index);
         this.soldier.index        = conf.index;
         this.soldier.inputEnabled = true;
         this.soldier.events.onInputDown.add(domo.goClick, this); // click under soldier
}
Menu.prototype.kill = function () {
         this.soldier.kill();
}
function oMenu(){
  var list = [];
  var activity = false;
  var action  = function(a,b,c){console.log(a,b,c);};
  var author  = undefined;

  var _create = function(data){
     list.push(new Menu(data));
  }
  var _clear = function(){
     for(i in list){
          list[i].kill();
     }
     for(i in list){
          for(i in list){
            if(!list[i].soldier.alive)
              list.splice(i,1);
          }
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
      create: function(data){
           _create(data);
           return this;
      },
      clear: function(){
           _clear();
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
