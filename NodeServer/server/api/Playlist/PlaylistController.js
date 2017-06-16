var schema = require('./PlaylistSchema.js');
var _ = require('lodash');

exports.param = function (req, res, next, id) {
    schema.findById(id)
        .populate('author songs')
        .exec()
        .then((playlist)=>{
            req.playlist = playlist;
            next();
        },(error)=>{
            next({error:error,type:400, message:"Play list not found"});
        })
}

exports.param_song = function (req, res, next, id) {
    schema.findById(id)
        .populate('author songs')
        .exec()
        .then((playlist)=>{
            req.playlist = playlist;
            next();
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.get = function (req, res, next) {
    console.log("req.query", req.query);
    schema.find({})
        .populate('author songs')
        .exec()
        .then((playlists)=>{
            res.status(200).json(playlists)
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.getOne = function (req, res, next) {
    res.status(200).json(req.playlist);
}

exports.post = function (req, res, next) {
    var playlist = req.body;
    schema.create(playlist)
        .then((playlist)=>{
            res.status(200).json(playlist);
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.delete = function (req, res, next) {
    req.playlist.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        },(err)=>{
            next({error:error,type:400});
        })
}

exports.put = function (req, res, next) {
    var playlist = req.playlist;
    var newPlaylist = req.body;

    _.merge(playlist, newPlaylist);
    playlist.save()
        .then((saved)=>{
            res.status(200).json(saved);
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.addSong = function (req,res,next) {
    var playlist = req.playlist;
    var playlistSongs = req.playlist.songs;
    if(!req.query.songId){
        res.status(404).json({message: "To add a song you must provide the songId in a query param"});
    }else{
        var songId = req.query.songId
        var found = _.find(playlistSongs,function (songid) {
            return songid._id == songId;
        })
        if(found){
            res.status(404).json({message: "This song is already in this playlist"})
        }else{
            playlist.songs.push(songId);
            playlist.save()
                .then((saved)=>{
                    res.status(200).json(saved);
                },(error)=>{
                    next({error:error,type:400});
                })
        }
    }
}
