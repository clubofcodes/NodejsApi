const mongoose = require('mongoose');

const studentschema = mongoose.Schema({
    fullname: String,
    uid: String,
    username: String,
    password: String,
    department: String,
    cellno: String,
    dob: String,
    gender: String,
    token: String
});

//Model name here must be singular & collection in db plural
module.exports = mongoose.model("studentdetail", studentschema); //studentdetail is model without 's' at prefix as in collection.
