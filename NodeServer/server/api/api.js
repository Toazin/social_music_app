var api = require('express').Router();

api.use('/playlist', require('./Playlist/Playlist.js'));
api.use('/profile', require('./Profile/Profile.js'));
api.use('/song', require('./Song/Song.js'));
api.use('/user', require('./User/User.js'));

module.exports=  api;
