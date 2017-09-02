function Anew(soldier,img,speed){
    //privates
    var _alive = true;
    var _test;
    var _duration;
    var _speed = speed;
    var _bullet = week.get('game').add.sprite((soldier.x),(soldier.y+20), img);
    _bullet.enableBody      = true;
    _bullet.physicsBodyType = Phaser.Physics.ARCADE;
    var _tween;
    var _create = function(){
          _bullet.force           = 2;
          _bullet.current         = 'spin';
        return _bullet;
    }
    var _moveSprite = function(_pointer) {
        _bullet.rotation        = week.get('game').physics.arcade.angleBetween(_bullet, _pointer);
       if(_tween != undefined)
        if(_tween && _tween.isRunning){
            _tween.stop();
        }
        //_duration = (week.get('game').physics.arcade.distanceBetween(_bullet, _pointer) / _speed) * 1000;
        _duration = _speed;
        x = _pointer.x + (_pointer.width/2);
        y = _pointer.y + (_pointer.height/2);
        _tween    = week.get('game').add.tween(_bullet).to({ x:x , y:y }, _duration, Phaser.Easing.Linear.None, true);
        _tween.onComplete.add(_and_move,this);
    }
    var _and_move = function(){
       _bullet.current = 'boom';
       _stopped_bomb();
    }
    var _stopped_bomb = function(a,b){
       _bullet.kill();
    }
    var _set_pointer = function(pointer){
       _pointer = pointer;
    }
    //public's
    return {
        create: function(){
            return _create();
        },
        move: function(pointer){
            return _moveSprite(pointer);
        },
        stop_tween: function(){
            return _tween.stop();
        }
    };
}
week.set('Anew',Anew);
