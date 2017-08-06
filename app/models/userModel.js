// userModel.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: String, 
    admin: Boolean 
}));