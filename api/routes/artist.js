'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artists'});

api.get('/artist/:id',md_auth.ensureAuth, ArtistController.getArtist);
api.post('/artist',md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth, ArtistController.getArtists);
api.put('/updateArtist/:id',md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/deleteArtist/:id',md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/uploadImage/:id',[md_auth.ensureAuth,md_upload], ArtistController.uploadImage);
api.get('/getImage/:imgFile',[md_auth.ensureAuth,md_upload], ArtistController.getImageFile);

module.exports = api;