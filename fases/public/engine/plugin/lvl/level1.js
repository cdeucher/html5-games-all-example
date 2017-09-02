var map = {
	create: function(){
		this.main();
	},
	preload: function(){
		week.get('game').load.tilemap('map', 'map/shadow1.json', null, Phaser.Tilemap.TILED_JSON);
		week.get('game').load.image('solo',  'map/img/map/map1_1.png');
		week.get('game').load.spritesheet('woods', 'map/img/map/map1_2.png',64,64);
		week.get('game').load.image('map1_wall_1',  'map/img/map/map1_wall_1.png');
    for (i in week.get('data').plugins)
            week.get(week.get('data').plugins[i].name).preload();
  },
  render: function(){
    if(week.get('hamer').isReady())
       for (i in week.get('data').plugins)
                 week.get(week.get('data').plugins[i].name).render();
  },
  update: function(){
    if(week.get('hamer').isReady())
       for (i in week.get('data').plugins)
                week.get(week.get('data').plugins[i].name).update();
  },
  onProgress: function(progress){
     if(progress==100){
        this.main();
     }
  },
  fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
     //console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
     $('#bar').html("Loading : "+progress+"%");
     this.onProgress(progress);
  },
  main: function(){
     week.get('game').physics.startSystem(Phaser.Physics.ARCADE);
     week.get('game').world.setBounds(0, 0, 2880, 1600);
		 week.get('game').scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
     /*
     *   Map
     */
     map = week.get('game').add.tilemap('map');
     map.addTilesetImage('solo');
     layer = map.createLayer('solo');
     layer.resizeWorld();
		 //
		 var x = {    'fire' :week.get('game').add.group(),
 								  'LayerGround':week.get('game').add.group(),
 								  'create_centuria':week.get('game').add.group(),
								  'create_orda':week.get('game').add.group()};
		 week.set('xmen',x);
     //
     rastro = map.createLayer('woods');
     rastro.resizeWorld();
     /*
      * Settings
     */
     week.get('game').input.onDown.add(move, this);
     /*
      * Timers
     */
     week.get('game').time.advancedTiming = true;
     //week.get('game').time.events.loop(1000,week.get('hamer').timer,this);
     ready = true;
    for (i in week.get('data').plugins){
         week.get(week.get('data').plugins[i].name).create();
    }
		 //go week.get('game')
		 week.get('cli').new('carbonaria');
		 week.get('celtas').new('carbonaria');
		 week.get('walls').conf({'obj':'walls','img':'map1_wall_1'}).new_centuria(1097).new_orda();//need objects in maps
  }
}
