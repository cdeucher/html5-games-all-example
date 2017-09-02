var game =  new Phaser.Game(640, 480, Phaser.AUTO, 'gameContent');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('level1', level1State);
game.state.add('level2', level2State);
game.state.start('boot');

function set(a){
  game.state.start(a);
}
