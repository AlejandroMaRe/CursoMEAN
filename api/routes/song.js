'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/songs'});

api.get('/getSong/:id',md_auth.ensureAuth, SongController.getSong);
api.post('/saveSong',md_auth.ensureAuth, SongController.saveSong);
api.get('/getSongs/:id?',md_auth.ensureAuth, SongController.getSongs);
api.put('/updateSong/:id',md_auth.ensureAuth, SongController.updateSong);
api.delete('/deleteSong/:id',md_auth.ensureAuth, SongController.deleteSong);
api.post('/uploadFileSong/:id',[md_auth.ensureAuth,md_upload], SongController.uploadFile);
api.get('/getFileSong/:songFile', SongController.getSongFile);

module.exports = api;