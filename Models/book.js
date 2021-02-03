const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    qty:{
        type:Number,
        required:true,
        min:1
    },
    authors:{
        type:Array
    },
    address:{
        add1:{
            type:String
        },
        add2:{
            type:String
        }
    }
},{timestamps:true});

//Model name here must be singular & collection in db plural
module.exports = mongoose.model("Book", schema); //Book is model without 's' at prefix in collection.