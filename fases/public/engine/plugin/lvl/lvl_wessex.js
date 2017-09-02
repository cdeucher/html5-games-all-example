var map = {
  create: function(){
    this.main();
  },
  preload: function(){
      week.get('game').load.tilemap('map', week.get('data').current.map.json, null, Phaser.Tilemap.TILED_JSON);
      week.get('game').load.image('solo',  'map/img/map/map1_1.png');
      week.get('game').load.image('shield','map/img/f_mapa/shield.png');

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
     /*
     *   Map
     */
     map = week.get('game').add.tilemap('map');
     map.addTilesetImage('solo');     

     tabuleiro = map.createLayer('tabuleiro');
     tabuleiro.resizeWorld();
     stay = map.createLayer('stay');
     stay.resizeWorld();
     week.set('layer',tabuleiro);
     week.set('stay',stay);
     /*
      * Settings
      */
     var x = {    'index1' :week.get('game').add.group(),
                  'index2' :week.get('game').add.group(),
                  'index3' :week.get('game').add.group(),
                  'index4' :week.get('game').add.group()};
     week.set('xmen',x);
     /*
      * Timers
     */
     week.get('game').time.advancedTiming = true;
     //week.get('game').time.events.loop(1000,week.get('hamer').timer,this);
     ready = true;
     for (i in week.get('data').plugins){
         week.get(week.get('data').plugins[i].name).create();
     }
     week.get('cli').new();
     week.get('celtas').new();
 } 
}