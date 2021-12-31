const { string } = require('joi');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    username : String,
    email: String,
    phone: String,
    images:String,
    password: String ,

    urs_role:{"type":String,"enum":["seller","buyer"]} ,
    is_active:  { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);