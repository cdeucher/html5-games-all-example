/*
* Romanos
* @Autor Cristiano Boell
* conf - Object
* conf.x - int
* conf.y - int
* conf.type - int [0,1,2,3,4,5]
*/
Romanos = function (conf) {
         Warrior.Class.apply(this, [1]);
         this._id      = 'ax'+new Date().getTime()+Math.floor((Math.random() * 9999) + 1).toString()+'ax';
         this.x        = conf.x;
         this.y        = conf.y;
         this.indicey  = conf.indicey;
         this.indicex  = conf.indicex;
         this.type     = conf.type;
         this.dono     = conf.dono;
         this.cap      = (conf.cap  == undefined)? undefined: conf.cap;
         this.db       = (conf.db   == undefined)? false: conf.db;
         this.boot     = (conf.boot == undefined)? false: conf.boot;
         this.base     = (conf.base == undefined)? {x:this.x+50,y:this.y+50}: {x:conf.base.x,y:conf.base.y};
         this.alive    = true;
         this.dir      = 0;
         this.battle   = undefined;
         this.myATK    = undefined;
         this.velocity = 40000;
         this.troops   = 'equals'; //troops are equals  - "others" to mixed troops
         this.enemy    = [];
     switch (conf.type) {
             case 0:
                 this.soldier = week.get('game').add.sprite(this.x,this.y, 'soldier', 0);
                 this.healt  = 10;
                 this.armor  = 0.9;//defesa
                 this.force  = 4;
                 this.legion = (conf.legion == undefined) ? 6 : conf.legion;
                 this.cost   = 2;
                 this.action_WALK= [[0,1,2,3],[0,1,2,3]];
                 this.action_ATK = [[7,6,5,4],[7,6,5,4]];
                 this.Isee     = 300;
                 this.velocity = 30000;
                 this.base   = this.base;
                 break;
             case 1:
                 this.soldier = week.get('game').add.sprite(this.x,this.y, 'archer', 0);
                 this.healt  = 8;
                 this.force  = 2;
                 this.armor  = 0.8;//defesa
                 this.legion = (conf.legion == undefined) ? 4 : conf.legion;
                 this.cost   = 2;
                 this.action_WALK= [['walk0','walk1','walk2','walk3'],['2walk0','2walk1','2walk2','2walk3']];
                 this.action_ATK = [['atk0','atk1','atk2','atk3','atk3','atk3','atk3'],['2atk0','2atk1','2atk2','2atk3','2atk3','2atk3','2atk3']];
                 this.base   = this.base;
                 this.Isee   = 350;
                 this.bounds = 200;
                 this.speed  = 2000; //archer speed arrow
                 this.arrow  = 'arrow';
             break;
             case 2:
                 this.soldier = week.get('game').add.sprite(this.x,this.y, 'knight', 0);
                 this.healt  = 10;
                 this.force  = 2;
                 this.armor  = 0.9;//defesa
                 this.legion = (conf.legion == undefined) ? 5 : conf.legion;
                 this.cost   = 2;
                 this.action_WALK= [[0,1,2,3],[11,10,9,8]];
                 this.action_ATK = [[4,5,6,7],[12,13,14,15]];
                 this.base   = this.base;
                 this.Isee   = 160;
             break;
             case 3:
                 this.soldier = week.get('game').add.sprite(this.x,this.y, 'balistax', 0);
                 this.healt  = 20;
                 this.force  = 7;
                 this.armor  = 1.9;//defesa
                 this.legion = (conf.legion == undefined) ? 0 : conf.legion;
                 this.cost   = 2;
                 this.action_WALK= [[0,0],[1,1]];
                 this.action_ATK = [[0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1]];
                 this.base   = this.base;
                 this.Isee   = 450;
                 this.bounds = 400;
                 this.speed  = 2000; //balista speed arrow
                 this.arrow  = 'balista_arrow';
            break;
     }

         this.anima    = this.soldier.animations.add('atk', this.action_ATK[0], 4, false);
         this.anima2   = this.soldier.animations.add('atk2', this.action_ATK[1], 4, false);
         this.anima3   = this.soldier.animations.add('atk_wall1', this.action_ATK[0], 4, false);
         this.anima4   = this.soldier.animations.add('atk_wall2', this.action_ATK[1], 4, false);
         this.anima.onComplete.add(this.stopAtk, this);
         this.anima2.onComplete.add(this.stopAtk, this);
         this.anima3.onComplete.add(this.stopAtkWalls, this);
         this.anima4.onComplete.add(this.stopAtkWalls, this);
         this.soldier.animations.add('walk',  this.action_WALK[0], 4, true);
         this.soldier.animations.add('walk2', this.action_WALK[1], 4, true);
         this.soldier.animations.add('stay',  this.action_WALK[0], 4, false);
         week.get('game').physics.enable(this.soldier, Phaser.Physics.ARCADE);
         this.bar();
         this.soldier.inputEnabled = true;
         this.soldier.events.onInputDown.add(soldier_imput, this); // click under soldier
         this.soldier.animations.play('walk');
         this.current = 'walk';
         this.tween();
         //week.get('game').world.bringToTop(week.get('LayerGround'));
         week.get('xmen').LayerGround.add(this.soldier);
         week.get('xmen').LayerGround.setAll('z', 2);
};
week.set('romanos',Romanos);
