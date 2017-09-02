//step
class ecStep {
  constructor(a,color='0x000000', border=0){
    this._id      = 'step'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
    //this.bounds   = new Phaser.Rectangle(a.worldX+1,a.worldY+1,a.height-2, a.width-2);
    this.bounds   = new Phaser.Rectangle((a.worldX+ border),(a.worldY +border),(a.height - border), (a.width -border));
    this.graphics = week.get('game').add.graphics(this.bounds.x, this.bounds.y);

    this.graphics.beginFill(color);
    this.graphics.drawRect(0, 0, this.bounds.width, this.bounds.height);
    this.graphics.alpha = 0.5;
    this.graphics.inputEnabled = true; 
    //week.get('xmen').index3.add(this.graphics);
  }
  set_click(action=function(){},paramns=null){
    this.graphics.paramns = paramns;
    this.graphics.events.onInputDown.add(action, this); //click under soldier        
  }
  kill(){
    this.graphics.kill();
  }
};
//--------------------------------------------------------------------------------
//WarFoge - control of the steps
class oWarFoge extends ecTools{
    constructor(){
       super()
       this.name    = 'warfoge'
       this.list    = []
       this.index_i = 0
       this.index_j = 0
    }
    //set list (a) { this.list = a; }
    //get list () { return this.list; }
    preload(){
         week.get('game').load.image('shield_human',      'map/img/f_mapa/shield.png');
         week.get('game').load.image('shield_orda',       'map/img/f_mapa/shield.png');
    }
    _new(a,b, i , j){  
        if(this.list[i] == undefined) this.list[i] = [];
        if(this.list[i][j] == undefined) this.list[i][j] = [];

        this.list[i][j]   = new ecStep(a,b); //b param is color of background
        this.list[i][j].i = i;
        this.list[i][j].j = j;
    }    
    mount(){
        this.index_i = week.get('data').current.map.i;
        this.index_j = week.get('data').current.map.j;
        //var x = week.get('layer').getTileX(week.get('game').input.activePointer.worldX);
        //var y = week.get('layer').getTileY(week.get('game').input.activePointer.worldY);        
        for (let i=0; i< this.index_i; i++){
          for (let j=0; j< this.index_j; j++){            
            let tile      = map.getTile(i, j, week.get('layer'));
            let stay      = map.getTile(i, j, week.get('stay'));
            if(tile != undefined) this._new(tile,stay, i, j);
          }
        }                  
    }
    step_by_step(i , j , color='0xffffff' , border=0){
          var tile      = map.getTile(i, j, week.get('layer'));
          return tile == null ? {kill:function(){},set_click:function(){}} : new ecStep(tile, color, border);
    }
    see( index_i, index_j, n){        
        for (let i= index_i; i< (index_i+n); i++){
          for (let j= index_j; j< (index_j+n); j++){            
            if(this.list[i] != undefined && this.list[i][j] != undefined)
             this.list[i][j].kill()
          }
        }  
    }  
    alive( index_i, index_j , n){        
        var alive = false;
        for (let i= index_i; i< (index_i+n); i++){
          for (let j= index_j; j< (index_j+n); j++){            
            if(this.list[i] != undefined && this.list[i][j] != undefined){
              if(this.list[i][j].graphics.alive == false)
                alive=true;
            }
          }
        }  
       return alive; 
    }          
    _kill(){
      for(let i in this.list)
         for(let j in this.list[i])
            this.list[i][j].kill();      
    }
    clear(){
        this._kill();    
    }    
};

var warfogex = new oWarFoge();
week.set('warfoge',warfogex);