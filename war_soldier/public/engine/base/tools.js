var week = function() {
  var game = [];
  return {
    set: function(a,b) { return game[a] = b; },
    get: function(a) { return game[a]; },
    list: function() { return game; },
    l: function(a,b,c,d){
      if(this.isObject(a)){
            console.log(a);
      }else{  
        tmp='';
        tmp+=(a != undefined)?a:'';
        tmp+=(b != undefined)?b:'';
        tmp+=(c != undefined)?c:'';
        tmp+=(d != undefined)?d:'';
        console.log(tmp); 
      }
      return this;
    },
    loadScript: function(url, what,callback){
            var script = document.createElement("script")
            script.type = "text/javascript";
            if (script.readyState){  //IE
                script.onreadystatechange = function(){
                    if (script.readyState == "loaded" || script.readyState == "complete"){
                        script.onreadystatechange = null;
                        callback(what);
                    }
                };
            } else {  //Others
                script.onload = function(){              
                    callback(what);
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
    },
    isObject: function(val){ return (typeof val === 'object'); }
  };
}();

var Interface = {
    abstract :function(c){
        if( c.prototype.isPrototypeOf(this) )
            throw new Error('Abstract Class')
    }
}
var Obj = {
    Class :function(){
        //Interface.abstract.apply(this, [Obj.Class])
        //fixed
        width  = (window.innerWidth >= 1200) ? 1200 : 900;
        height = (window.innerWidth >= 1200) ? 600 : 480;
        ready  = true;
        game   = {my:{}};
        Layers = [];
        Plugins= [];
        //function
        this.logme        = function(a){ console.log(a); };
        this.isReady      = function(){  return (ready) ? true : false; };
        this.get_game     = game;
        this.addLayer     = function(name,layer){ Layers[name] = layer; };
        this.preload      = function(){};
        this.create       = function(){};
        this.update       = function(){};
        this.render       = function(){};
        this.get_plugin   = function(a){  for (i in week.get('data').plugins)
                                             if( week.get('data').plugins[i].name == a) return week.get('data').plugins[i]; };
        this.isObject     = function(val){ return (typeof val === 'object'); };
    }
}
