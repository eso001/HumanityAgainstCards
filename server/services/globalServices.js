const secret = require('../config').secret;
const jwt = require('jwt-simple');
module.exports = {
	parseString:parseString,
	translateTokenToId: translateTokenToId
}

function parseString(obj){
	return JSON.parse(JSON.stringify(obj))
}

function translateTokenToId(token){
		const id = jwt.decode(token, secret);
		return id.sub
}
