const mongoose = require('mongoose');

const schema = mongoose.Schema({
    Name:String,
    Email:Number
});

 //Model name here must be singular & collection in db plural
module.exports = mongoose.model("rk_user", schema); //rk_user is model without 's' at prefix in collection.
