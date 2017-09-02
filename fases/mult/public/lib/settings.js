
var setting = function(socket){
      this.startTime = 0;
      this.latency = 0;
      this.socket = socket;//io.connect(connection+':'+port, {resource: 'C/socket.io', 'force new connection': true});
};
setting.prototype.go_rooms = function(number){
      this.myRoom = "Room"+number;
};
setting.prototype.get_room = function(){
   return this.myRoom;
};
setting.prototype.set_user = function(user){
   this.user = user;
};
setting.prototype.go_latency = function(){
    setInterval(function() {
      st.startTime = new Date().getTime();
      st.socket.emit('ping');
    }, 2000);

    this.socket.on('pong', function() {
      st.latency = (new Date().getTime() - st.startTime);
    });
};
setting.prototype.init = function(){
  var gui = new dat.GUI({ autoPlace: false });
     document.getElementById('Mdebug').appendChild(gui.domElement);

  var _playersettings = gui.addFolder('Your settings');
    _playersettings.add(this, 'latency').listen();
    _playersettings.open();

    this.go_latency();
};
st = new setting(socket);
st.init();
