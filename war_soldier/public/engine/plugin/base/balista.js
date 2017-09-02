var Interface = {
    abstract :function(c){
        if( c.prototype.isPrototypeOf(this) )
            throw new Error('Abstract Class')
    }
}
var Balista = {
    Class :function(){
      this.alive    = true;
      this.dir      = 0;
      this.current  = undefined;
      this.battle   = undefined;
      this.myATK    = undefined;
      this.velocity = 40000;
      this.healt    = 10;
      this.force    = 2;
      this.cost     = 2;
      this.Isee     = 300;
      this.enemy    = [];
      //
      this.animaAnew = function(enemy){
            bomb = new Anew(this.soldier,'arrow');
            bullet = bomb.create();
            bullet.father = bomb;
            bomb.move(enemy);
      };
      this.move_to = function(pointer){
        console.log(pointer);
            this.soldier.tween = week.get('game').add.tween(this.soldier).to({ x: pointer.x, y: pointer.y },this.velocity, Phaser.Easing.Linear.None);
            this.soldier.tween.start();
            //this.soldier.tween.onComplete.add(this.end_walk,this);
      };
      this.update = function(enemys){
          this.enemys = enemys;
          this.look();
          this.bar_update();
      };
      this.look = function(){
        if(this.current == undefined)
          for(i in this.enemys){
              if(this.enemys[i].alive && this.current == undefined){
               if(this.enemys[i].myATK == undefined || this.enemys[i].myATK == this._id){ //only one atk each enemy
                 this.enemys[i].soldier._id = this.enemys[i]._id;
                 if (week.get('game').physics.arcade.distanceBetween(this.soldier, this.enemys[i].soldier) < this.Isee){
                      this.current = 'walk';
                      this.enemys[i].myATK = this._id;//(this.bounds != undefined)? undefined : this._id; //only one atk me - archer no have limit
                      //console.log(this._id,'=>',this.enemys[i]._id);
                      this.move_to({_id:this._id,enemy_id:this.enemys[i]._id});
                 }
               }
             }
          }
      };
      this.bar  = function(){
                bmd = week.get('game').add.bitmapData(this.healt*3, 4);
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, this.healt*3, 4);
                bmd.ctx.fillStyle = (!this.db) ? '#00685e' : '#980000' ;
                bmd.ctx.fill();
                this.progress = week.get('game').add.sprite(this.soldier.x, this.soldier.y-30, bmd);
                this.progress.anchor.set(0.5);
      };
      this.bar_update = function(){
          if(this.alive){
                this.progress.x = this.soldier.x;
                this.progress.y = this.soldier.y-30;
          }
      };
  }
}
