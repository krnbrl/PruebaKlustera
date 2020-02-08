'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(usuario){
    var payload = {
        sub: user._id,
        name: usuario.name,
        password: usuario.password,
        lat: moment().unix(),
        exp: moment().add(2, 'hour').unix,
    }
    return jwt.encode(payload);
}