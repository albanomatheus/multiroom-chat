/* IMPORTANDO CONFIGURAÇÕES DO SERVIDOR */
let app = require('./config/server');

let server = app.listen(3000, function () {
	console.log("Server on");
});

let io = require('socket.io').listen(server);

app.set('io', io);


io.on('connection', function (socket) {
	socket.on('serverMsg', function (data) {
		/* PARTICIPANTES CONECTADOS */
		if (parseInt(data.key) == 0) {
			socket.emit('updateUsers', data.nickname);
			socket.broadcast.emit('updateUsers', data.nickname);
		}
		
		/* DIALOGO DE ENTRE PARTICIPANTES */
		socket.emit('clientMsg', data);
		socket.broadcast.emit('clientMsg', data);
	});
	
});
