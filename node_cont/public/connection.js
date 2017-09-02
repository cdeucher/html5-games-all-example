class oSo{
    constructor(conn,port){
    	this.conn = conn;
    	this.port = port;
    	this.socket=undefined;
    	this.userx=undefined;
    	this.rooms=undefined;
    	this.cont = 0;
    	this.connect();
    }
    l(a){ console.log(a); return this; }
    connect(i=1){
		this.socket = io.connect(this.conn+':'+this.port, {resource: 'A/socket.io', 'force new connection': true});
		this.userx   = 'x3'+Math.floor(Math.random() * 100 + 1 + i);
		this.rooms   = 'x3';
		this.socket.on('connect', function () {
		   obj.l("user connected:"+obj.userx);
		   obj.socket.emit('join', obj.userx, obj.rooms);
		});
		this.socket.on('cont', function (data) {
      		obj.l('cont:'+data);
      		document.getElementById('cont').innerHTML = 'Fila::('+data+')';
  		});
    }
    next_connection(num=10){
        for (let i=0;i<=num;i++) {
            this.connect(i);
        }
    }
}

var obj  = new oSo(connection,port);