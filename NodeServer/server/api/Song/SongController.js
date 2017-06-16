var schema = require('./SongSchema.js');
var _ = require('lodash');

exports.param = function (req, res, next, id) {
    schema.findById(id)
        // .populate('user song')
        // .exec()
        .then((song)=>{
            req.song = song;
            next();
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.get = function (req, res, next) {
    schema.find({})
        // .populate('user song')
        // .exec()
        .then((songs)=>{
            res.status(200).json(songs)
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.getOne = function (req, res, next) {
    res.status(200).json(req.song);
}

exports.post = function (req, res, next) {
    var song = req.body;
    schema.create(song)
        .then((song)=>{
            res.status(200).json(song);
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.delete = function (req, res, next) {
    req.song.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        },(err)=>{
            next({error:error,type:400});
        })
}

exports.put = function (req, res, next) {
    var song = req.song;
    var newsong = req.body;

    _.merge(song, newsong);
    song.save()
        .then((saved)=>{
            res.status(200).json(saved);
        },(error)=>{
            next({error:error,type:400});
        })
}
