var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);

var SongSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('song', SongSchema);
