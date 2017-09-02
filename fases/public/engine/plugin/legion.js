class Legionary{
   constructor(conf) {
         this.x        = conf.x;
         this.y        = conf.y;
         this.forStep  = 2; // how many steps this obj have;
         this._id      = 'legion'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
         this.soldier  = week.get('game').add.sprite(this.x,this.y, 'shield_human');
         this.soldier._i  = conf.old_i;
         this.soldier._j  = conf.old_j;         
         this.soldier._id = this._id;         
        if(conf.dono == week.get('cli').username){ 
         this.soldier.inputEnabled = true;
         //this.soldier.input.enableDrag(true);
         this.soldier.events.onInputDown.add(this.click, this); // click under soldier  
        }else{
         this.soldier.alpha = 0;
        }       
         //week.get('xmen').index2.add(this.soldier);
    }
    click(a,b){
       for(i in week.get('data').current.path)
          week.get('data').current.path[i].kill()
    
        var x = week.get('layer').getTileX(a.x);
        var y = week.get('layer').getTileY(a.y);  
       for (i=(x-this.forStep);i<=(x+this.forStep);i++){
        for (let j =(y-this.forStep) ; j<=(y+this.forStep); j++){
            tmp= week.get('warfoge').step_by_step(i,j, '0x00ffee');
            tmp.set_click(this.path_click , this); //here I set who clicked
            week.get('data').current.path.push(tmp);
        }
       }         
        a.bringToTop();  
    }
    path_click(tile,pointer){
        var x = tile.x;
        var y = tile.y;
        var to_to = { 'x': x, 'y': y};
        this.tween = week.get('game').add.tween(tile.paramns.soldier).to(to_to, 1000, Phaser.Easing.Linear.None, true); 
        tile.paramns.update_xy(to_to);

       for(i in week.get('data').current.path)
          week.get('data').current.path[i].kill()                     
    }
    update_xy(a){
       week.get('data').City[week.get('data').lvl.Country].general[this.soldier._i].army[this.soldier._j].x = a.x;
       week.get('data').City[week.get('data').lvl.Country].general[this.soldier._i].army[this.soldier._j].y = a.y;
    }
    update(){
      if(this.soldier.alive == true){
       let x = week.get('layer').getTileX(this.soldier.x);
       let y = week.get('layer').getTileY(this.soldier.y);            
       week.get('warfoge').see(x,y , 2);
      } 
    }
    kill() {
      this.soldier.kill();
    }
}
class ecEnemy extends Legionary{
   constructor(conf){
     super(conf)
     this.showed = [];
     this.show = false;
     this.forStep = 1
   }
   update(){
     if(this.soldier.alive == true){
       let x = week.get('layer').getTileX(this.soldier.x);
       let y = week.get('layer').getTileY(this.soldier.y);                      
       if(week.get('warfoge').alive(x,y , 1) == true){
          if(this.show == false && week.get('data').current.war == false){ //set war
              week.get('data').current.war = true;
              this.soldier.alpha = 1; 
              this.background(this.soldier);
              let list_war = this.mount_war(this.soldier);              
              week.get('battle').new(this.soldier,list_war);        
          }   
       }
     } 
   }
   background(a){
      this.show = true;
      var x = week.get('layer').getTileX(a.x);
      var y = week.get('layer').getTileY(a.y);  
      for (i=(x-this.forStep);i<=(x+this.forStep);i++){
        for (let j =(y-this.forStep) ; j<=(y+this.forStep); j++){
            this.showed.push(week.get('warfoge').step_by_step(i,j,'0xff0000',3));
        }
      }         
   }
   mount_war(a){
      var list = {my:[],enemy:[]}; 
      for(var i in week.get('data').City[week.get('data').lvl.Country].general){
          for(let j in week.get('data').City[week.get('data').lvl.Country].general[i].army){
              var sold = week.get('data').City[week.get('data').lvl.Country].general[i].army[j]; 
             if (week.get('game').physics.arcade.distanceBetween(sold, a) < 300){
                list.my.push(sold);  
              }   
          } 
      }  
      for(var i in week.get('enemy').City[week.get('data').lvl.Country].general){
          for(let j in week.get('enemy').City[week.get('data').lvl.Country].general[i].army){
              var sold = week.get('enemy').City[week.get('data').lvl.Country].general[i].army[j];              
             if (week.get('game').physics.arcade.distanceBetween(sold, a) < 300){
                list.enemy.push(sold);  
              }   
          } 
      }       
      return list;    
   }
   kill() {
      for (i in this.showed)
        this.showed[i].kill();

      this.soldier.kill();
   }   
}

class oLegion extends ecTools{    
    constructor(){
        super()
        this.name       = 'legion'
        this._centuria  = [];  
        this._orda      = []; 
    }

    preload(){
         week.get('game').load.image('shield_human',      'map/img/f_mapa/shield.png');
         week.get('game').load.image('shield_orda',       'map/img/f_mapa/shield.png');
    }
    _create(a){  
          if(a.dono == week.get('cli').username){
             tmp = new Legionary(a);
             this._centuria[tmp._id] = tmp;
          }else{
             tmp = new ecEnemy(a);
             this._orda[tmp._id] = tmp;
          }   
    }
    legion (obj , i , j , n){
           let tile = map.getTile(i, j, week.get('layer'));                  
           obj.y = tile.worldY;
           obj.x = tile.worldX;
           obj.start = true;          
           this._create(obj);
    }
    mount(list = []){
          var cont=0;               
          for(var i in list){
             for(let j in list[i].army){                       
               if(list[i].army[j].start == false){
                  list[i].army[j].old_i = i; 
                  list[i].army[j].old_j = j;
                  this.legion(list[i].army[j],i,j,cont);                 
               }else{                   
                  let x = week.get('layer').getTileX(list[i].army[j].x);                 
                  let y = week.get('layer').getTileY(list[i].army[j].y);
                  this.legion(list[i].army[j],x,y,cont);
               }
                cont++;                
             }
          }
    }    
    get_war(a){
          var cont=0;               
          for(var i in week.get('data').City[week.get('data').lvl.Country].general){
             for(let j in list[i].army){                       
               if(list[i].army[j].start == false){
                  list[i].army[j].old_i = i; 
                  list[i].army[j].old_j = j;
                  this.legion(list[i].army[j],i,j,cont);                 
               }else{                   
                  let x = week.get('layer').getTileX(list[i].army[j].x);                 
                  let y = week.get('layer').getTileY(list[i].army[j].y);
                  this.legion(list[i].army[j],x,y,cont);
               }
                cont++;                
             }
          }
    }     
    update(){        
      for (let i in this._centuria)
          this._centuria[i].update();
      for (let i in this._orda)
          this._orda[i].update();      
    }
    kill(){
      for (let i in this._centuria)
          this._centuria[i].kill();   
      for (let i in this._orda)
          this._orda[i].kill();              
    }
    clear(){
          this.kill();    
    }    
};

var Legion = new oLegion();
week.set('legion',Legion);