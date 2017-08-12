var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');
var Schema = new mongoose.Schema({
    username: {type:String, required: true},
    password: String
    
});

Schema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', Schema);