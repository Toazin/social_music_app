var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_PATH);

var UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    profile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }
});

module.exports = mongoose.model('user', UserSchema);
