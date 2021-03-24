const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    username: String,
    password: String,
    token: String
});

//Model name here must be singular & collection in db plural
module.exports = mongoose.model("rk_user", userschema); //rk_user is model without 's' at prefix in collection.
