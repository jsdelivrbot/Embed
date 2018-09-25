var experiences = null;

// Load JSON data
socket.on('update', function (data) {
    experiences = data;
    display(experiences);
});

socket.on('state-update', function (data) {
    setState(data.state, data.val);
});

// Experience playback
socket.on('play', function (data) {
    play(data);
});

socket.on('stop', function (data) {
    stop(data);
});

socket.on('start', function (data) {
    start(data);
});


// Hardware controls
socket.on('sleep', function (data) {
    sleep(data);
});

socket.on('wake', function (data) {
    wake(data);
});

// Back to welcome
socket.on('reset', function (data) {
    reset(data);
});

document.addEventListener('click', event => {

	var node = null;

	if (event.target.hasAttribute('data-action'))
		node = event.target;
	else if (event.target.parentNode.hasAttribute('data-action'))
		node = event.target.parentNode;

	if (node === null)
		return;

    // var button = (event.target.getAttribute('data-action') === 'BUTTON') ? event.target : event.target.parentNode;

    // if (button.nodeName !== 'BUTTON')
    //     return;

    var attr = node.getAttribute('data-action');

    console.log(node.nodeName,attr,'was clicked!');

    switch (attr){
        case 'command-stop':
            socket.emit('stop');
        break;  
        case 'command-start':
            socket.emit('start');
        break;  
        case 'command-sleep':
            socket.emit('sleep');
        break;     
        case 'command-wake':
            socket.emit('wake');
        break; 
        case 'command-reset':
            socket.emit('reset');
        break;
    }                                                                      
});

stop = () => {
    socket.emit('state-update',{state:'stopped',val:false});
}
start = () => {
    socket.emit('state-update',{state:'start',val:false});
}
sleep = () => {
    socket.emit('state-update',{state:'sleep',val:false});
}
wake = () => {
    socket.emit('state-update',{state:'wake',val:false});
}
reset = () => {
    socket.emit('state-update',{state:'reset-welcome',val:false});
}

setState = (state, val) => {
    document.body.classList.toggle(state, val);
    console.log(state,val);
    $("#system-status p").html(state,val);
}