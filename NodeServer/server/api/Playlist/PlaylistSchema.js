var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);

var PlaylistSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    songs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song'
    }]
});

module.exports = mongoose.model('playlist', PlaylistSchema);
