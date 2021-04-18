const mongoose = require('mongoose');

const alluserschema = mongoose.Schema({
    fullname: String,
    acc_id: String,
    password: String,
},{ timestamps: true });

//Model name here must be singular & collection in db plural
module.exports = mongoose.model("alluser", alluserschema); //alluser is model without 's' at prefix as in collection.
