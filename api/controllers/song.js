'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(req, res){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!song){
                res.status(404).send({message: 'El song no existe'});
            }else{
                res.status(200).send({song});
            }
        }
    });
    // res.status(200).send({message: 'Metodo getsong del controlador song.js'});
}

function saveSong(req,res){
    var song = new Song();

    var params = req.body;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album;

    song.save((err, songStored) => {
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!songStored){
                res.status(404).send({message: 'No se ha guardado la cancion'});
            }else{
                res.status(200).send({song: songStored});
            }
        }
    });
}
function getSongs(req, res){
    var albumId = req.params.album;
    
    if(!albumId){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }

    find.populate({
        path: 'album',
        model: Album,
        populate: {
            path: 'artist',
            model: Artist
        }
    }).exec((err, songs) => {
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!songs){
                res.status(404).send({message: 'No hay canciones'});
            }else{
                res.status(200).send({songs});
            }
        }
    });
}

function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!songUpdated){
                res.status(404).send({message: 'No existe la cancion'});
            }else{
                res.status(200).send({song: songUpdated});
            }
        }
    });
}

function deleteSong(req, res){
    var songId = req.params.id;

    Song.findByIdAndRemove(songId).exec((err,songRemoved) => {
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if(!songRemoved){
                res.status(404).send({message: 'No existe la cancion'});
            }else{
                res.status(200).send({song: songRemoved});
            }
        }
    });
}

function uploadFile(req, res){ //files es la variable global que da multiparty
    var songId = req.params.id;
    var file_name = 'No subido...';
    console.log(req.files);
    
    if(req.files){
        var file_path = req.files.file.path; //image es el name del formulario
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_path.split('\.');
        var file_ext = ext_split[1];
        if(file_ext == 'mp3' || file_ext == 'ogg'){
            // res.status(200).send({message: 'La extension de la imagen es correcta'});
            Song.findByIdAndUpdate(songId, {file:file_name}, (err, songUpdated) => {
                if(!songUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar la conacion'});
                }else{
                    res.status(200).send({song: songUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extension de la cancion no reconocida'});
        }

        // console.log(ext_split);
    }else{
        res.status(200).send({message: 'No has subido ninguna cancion'});
    }
}

function getSongFile(req, res){
    var song_File = req.params.songFile;
    var path_file = './uploads/songs/'+song_File;
    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la cancion'});
        }
    });
}


module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}