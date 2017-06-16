var schema = require('./ProfileSchema.js');
var _ = require('lodash');

exports.param = function (req, res, next, id) {
    schema.findById(id)
        .populate('friends playlists favorites')
        .exec()
        .then((profile)=>{
            req.profile = profile;
            next();
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.get = function (req, res, next) {
    schema.find({})
        .populate('friends playlists favorites')
        .exec()
        .then((profiles)=>{
            res.status(200).json(profiles)
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.getOne = function (req, res, next) {
    res.status(200).json(req.profile);
}

exports.post = function (req, res, next) {
    var profile = req.body;
    schema.create(profile)
        .then((profile)=>{
            res.status(200).json(profile);
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.delete = function (req, res, next) {
    req.profile.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        },(err)=>{
            next({error:error,type:400});
        })
}

exports.put = function (req, res, next) {
    var profile = req.profile;
    var newprofile = req.body;

    _.merge(profile, newprofile);
    profile.save()
        .then((saved)=>{
            res.status(200).json(saved);
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.addFriend = function (req,res,next) {
    var profile = req.profile;
    if(!req.query.userId){
        res.status(404).json({message: "To add a friend you must add a query 'userId' parameter"});
    }else{
        var friendId = req.query.userId;
        var foundSame = _.find(profile.friends,function(f){
            return f._id == friendId;
        })
        if(foundSame){
            res.status(404).json({message: "You already have this friend added!"});
        }else{
            profile.friends.push(friendId);
            profile.save()
                .then((saved)=>{
                    res.status(200).json(saved);
                },(err)=>{
                    next({error:error,type:400});
                })
        }
    }
}

exports.addFavoriteSong = function (req,res,next) {
    var profile = req.profile;
    if(!req.query.songId){
        res.status(404).json({message: "To add a favorite song you must add a query 'songId' parameter"});
    }else{
        var songId = req.query.songId;
        var foundSame = _.find(profile.favorites,function(f){
            return f._id == songId;
        })
        if(foundSame){
            res.status(404).json({message: "You already have this song in your favorites!"});
        }else{
            profile.favorites.push(songId);
            profile.save()
                .then((saved)=>{
                    res.status(200).json(saved);
                },(err)=>{
                    next({error:error,type:400});
                })
        }
    }
}

exports.addPlaylist = function (req,res,next) {
    var profile = req.profile;
    if(!req.query.playlistId){
        res.status(404).json({message: "To add a playlist you must add a query 'playlistId' parameter"});
    }else{
        var playlistId = req.query.playlistId;
        var foundSame = _.find(profile.playlists,function(f){
            return f._id == playlistId;
        })
        if(foundSame){
            res.status(404).json({message: "You already have this song in your favorites!"});
        }else{
            profile.playlists.push(playlistId);
            profile.save()
                .then((saved)=>{
                    res.status(200).json(saved);
                },(err)=>{
                    next({error:error,type:400});
                })
        }
    }
}
