'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

// mongoose.Promise = global.Promise; quitar aviso de mongoose pero no me funciono
mongoose.connect('mongodb://localhost:27017/curso_angula_2', (err,res) => {
    if(err){
        throw err;
    }else{
        console.log('---->>>>>  La base de datos funciona correctamente  <<<<<----');

        app.listen(port,function(){
            console.log("Servidor API REST de musica escuchando en http://localhost:"+port);
        })
    }
})
