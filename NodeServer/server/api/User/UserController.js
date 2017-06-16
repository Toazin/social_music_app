var schema = require('./UserSchema.js');
var ProfileSchema = require('../Profile/ProfileSchema.js');

var _ = require('lodash');

exports.param = function (req, res, next, id) {
    schema.findById(id)
        .populate('profile')
        .exec()
        .then((user)=>{
            req.user = user;
            next();
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.get = function (req, res, next) {
    schema.find({})
        .populate('profile')
        .exec()
        .then((users)=>{
            res.status(200).json(users)
        },(error)=>{
            next({error:error,type:400});
        })
}

exports.getOne = function (req, res, next) {
    res.status(200).json(req.user);
}

exports.post = function (req, res, next) {
    var user = req.body;
    var profilePayload = {
        name:user.username,
        friends:[],
        favorites:[],
        playlists:[]
    }
    ProfileSchema.create(profilePayload)
        .then((profile)=>{
            console.log("Profile created: ", profile);
            user.profile = profile._id;
            schema.create(user)
                .then((user)=>{
                    console.log("User created: ", user);
                    res.status(200).json(user);
                },(error)=>{
                    next({error:error,type:400});
                })
        }, (error)=>{

        })

}

exports.delete = function (req, res, next) {
    req.user.remove()
        .then((removed)=>{
            res.status(200).json(removed);
        },(err)=>{
            next({error:error,type:400});
        })
}

exports.put = function (req, res, next) {
    var user = req.user;
    var newuser = req.body;

    _.merge(user, newuser);
    user.save()
        .then((saved)=>{
            res.status(200).json(saved);
        },(error)=>{
            next({error:error,type:400});
        })
}
