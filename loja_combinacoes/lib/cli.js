/* 
 * @Autor Cristiano Boell
 */

Cli = function () {
    rd = (Math.floor(Math.random() * 3));  
    this.cli           = game.add.sprite(caminhos.getAt(0).x,150, 'cli', rd);   
    this.cli.img_index = rd;
    this.cli.alive     = true;      
    game.physics.enable(this.cli, Ryan.Physics.ARCADE); 
    this.cli.body.enable =true;    
    this.cli.body.collideWorldBounds = true;
    this.cli.body.minBounceVelocity  = true;
    this.cli.body.setSize(200, 300, 0, 0);
    this.cli.body.velocity.x =0;     
    //button
    this.cli.button        = game.add.sprite(game.camera.width-80, -20, 'mini',this.cli.img_index);
    game.physics.enable(this.cli.button, Ryan.Physics.ARCADE); 
    this.cli.button.body.enable = true;    
    this.cli.button.body.setSize(65, 65, 0, 0);
    //this.cli.contX = this.cli.button.width/2;    
    
    this.cli.update_fila = function(a){
            //animações
            a.contX = a.button.width/2; 
            a.andar = game.add.tween(a).to({ y: 120 }, 500, Ryan.Easing.Linear.None, true, 0,700, true)
                    .start();    
            a.tween = game.add.tween(a)
                    .to({ x: caminhos.getAt(1).x }, 5000, Ryan.Easing.Linear.None)
                    .start();
            a.tween._lastChild.onComplete.add(tweenCompleted,this);   
            //mini
            a.button.tween  = game.add.tween(a.button).to({ y: 130 },  5000, Ryan.Easing.Linear.None).start();   
            //click
            a.inputEnabled = true;
            a.events.onInputDown.add(function(a){ placar();
						 lixo();
						 restart(a); }, this); 
    };
    //anda final
    this.cli.bora = function(a,func){
            a.andar = game.add.tween(a).to({ y: 120 }, 500, Ryan.Easing.Linear.None, true, 0,700, true).start();
            a.tween = game.add.tween(a).to({ x: 0}, 5000, Ryan.Easing.Linear.None, true).start();
            a.tween._lastChild.onComplete.add(func,this);       
        }
    //mata botao, chama prancha    
    this.cli.morre = function(a){
            a.alive = false;
            a.button.kill();
            a.bora(a,function(a){a.kill();});//anda para o final        
    }   
    this.cli.update_fila(this.cli);
}

Cli.prototype.update = function(index){
   for (var i in cli){
       //atualiza botao
       cli[i].cli.button.x = game.camera.width + game.camera.x-80;  
       //remove mortos
      if(!cli[i].cli.alive) 
           cli.splice(i,1);  
   }
};
//contagem de tempo
Cli.prototype.updateCrono = function(index){
      for(var i in cli){
         cli[i].cli.contX--; 
         break;
      }    
      //cli[index].cli.contX--;
      cli[index].cli.button.body.setSize(cli[index].cli.contX*2, 65, 0, 0);
      // terminou o tempo
      if(cli[index].cli.contX < 2){
          placar();
          lixo();
          restart(cli[index].cli);
          leftImput();
      }    
};
Cli.prototype.render = function(){
      //game.debug.body(this.cli);
      game.debug.body(this.cli.button);
}
//stop cliente
function tweenCompleted (sprite){ 
      sprite.andar.pause();
      sprite.tween.pause();
};
//stop MINI
function tweenButton (sprite){ 
      sprite.tween.pause();
};
//kill MINI, lança cliente para final
function restart(a){ 
   //atualiza placar 
   placar();
   //morre atual
   a.morre(a);
   //atualizo a fila                                         
   for (var i in cli){
      if(cli[i].cli.alive) 
           cli[i].cli.update_fila(cli[i].cli);  
   }                                                
};
function lixo(){
  for (var i = 0; i < perfu.length; i++){
     if(perfu.getAt(i).x != perfu.getAt(i).old_x){ 
       perfu.getAt(i).fixedToCamera = false;  
       perfu.getAt(i).reset(perfu.getAt(i).old_x,perfu.getAt(i).old_y);
     } 
   }
};
function CliTimer(){  
      if(cli.length < clientes) 
       cli.push(new Cli());
};
 //atualizo a cronometro 
function CliTimerFila(){                                          
   for (var i in cli){
      if(cli[i].cli.alive) 
           cli[i].updateCrono(i);  
   }               
};
function placar(){
   tmp = false; 
   for (var i = 0; i < perfu.length; i++){ 
     if(perfu.getAt(i).x != perfu.getAt(i).old_x)  
       tmp = true;
   }
   if(tmp)counter++;
};
