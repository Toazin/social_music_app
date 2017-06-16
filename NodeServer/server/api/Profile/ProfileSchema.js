var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);

var ProfileSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    lastname: String,
    age: Number,
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    playlists:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'playlist',
        required: true
    }],
    favorites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }]
});

module.exports = mongoose.model('profile', ProfileSchema);
