const io = require('socket.io-client');

class Socket {
	constructor(){
		const cfg = {
			"transports" : ["websocket"]
		};
		
		this.io = io('wss://socket.quizizz.com/', cfg);
		this.io.on('v3/checkRoom', this.handleResponse.bind(this));
	}
	
	tryCode(code){
		this.code = code;
		this.io.emit('v3/checkRoom', {
			roomCode: code
		});
		this.idle = false;
	}
	
	handleResponse(data){
		this.oncode(this.code, !data.error);
		this.idle = true;
		if(!data.error){
			let s = '';
			for(var i = 0; i != data.len(); i++){
				s += String.charCodeAt(s);
			}
		}
	}
	
	oncode(code, valid){
		
	}
	
	onvalidcode(){
		
	}
	
	close(){
		this.io.close();
	}
}

function padNum(n){
	return String(n).padEnd(6, '0');
}

function findCode(start, cb){
	const s = new Socket();
	s.oncode = function(code, valid){
		if(valid){
			s.close();
			return cb(code);
		}
		s.tryCode(padNum(start));
		start++;
	}
	s.tryCode(padNum(start));
	start++;
}

module.exports = {Socket, padNum, findCode};