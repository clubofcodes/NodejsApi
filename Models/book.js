const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    qty:Number
});

 //Model name here must be singular & collection in db plural
module.exports = mongoose.model("Book", schema); //Book is model
