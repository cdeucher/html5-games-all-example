var Interface = {
    abstract :function(c){
        if( c.prototype.isPrototypeOf(this) )
            throw new Error('Abstract Class')
    }
}
var Tools = {
    Class :function(now){
        //Interface.abstract.apply(this, [Tools.Class])
        //fixed
        name     = 'y';
        ready    = false;
        //function
        this.name         = function(){ return this.name; }
        this.logme        = function(a){ console.log(a); }
        this.isReady      = function(){  return (ready) ? true : false; }
        this.start        = function(a){ week.get('game') = a;  }
        this.preload      = function(){ /*nothing*/ }
        this.create       = function(){ /*nothing*/ }
        this.update       = function(){ /*nothing*/ }
        this.render       = function(){ /*nothing*/ }
        this.clear        = function(){ /*nothing*/ }
        this.find         = function(id, source) {
                              for (var i = 0; i < source.length; i++) {
                                if (source[i]._id === id) {
                                  return source[i];
                                }
                              }
                              throw "Couldn't find object with id: " + id;
                            }                           
    }
};
class ecTools {
  constructor(){
     this.ready = true;
  }
  isReady (){  return (this.ready) ? true : false; }
  start   (a){ /*nothing*/  }
  preload (){ /*nothing*/ }
  create  (){ /*nothing*/ }
  update  (){ /*nothing*/ }
  render  (){ /*nothing*/ }
  clear   (){ /*nothing*/ }  
};
