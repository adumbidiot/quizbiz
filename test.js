const {Socket, padNum, findCode} = require('./index.js');

findCode(12, function(c){
	console.log(c);
});