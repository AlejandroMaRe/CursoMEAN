'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/albums'});

api.get('/album/:id',md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/saveAlbum',md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/getalbums/:id?',md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/updateAlbum/:id',md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/deleteAlbum/:id',md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/uploadImageAlbum/:id',[md_auth.ensureAuth,md_upload], AlbumController.uploadImage);
api.get('/getImageFileAlbum/:imageFile',md_auth.ensureAuth, AlbumController.getImageFile);

module.exports = api;