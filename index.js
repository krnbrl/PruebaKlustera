'use strict'

var app = require('./app');
var port = process.env.PORT || 3997;

app.listen(port, function(){
    console.log('El servidor esta escuchando');
    
});