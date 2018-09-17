const axios = require('axios');
const path = require('path')
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/public')));

server.listen(3000); 

io.on('connection', function(socket){

	console.log('Socket connected');

	axios.get('http://localhost/embed/embed-core/public/experiences.json')
		.then(response => {
			socket.emit('update', response.data);
		})
		.catch(error => {
			console.log(error);
		});

	socket.on('selected', (data)=> {
		socket.broadcast.emit('load', data);
		// socket.emit('load', data);
	});
});