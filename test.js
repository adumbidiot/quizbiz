const {Socket, padNum, findCode} = require('./index.js');

findCode(21, function(c){
	console.log(c);
});