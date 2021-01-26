const express = require('express');
const mongoose  = require('mongoose');
const route = require('./route');

//connect to mondodb 
mongoose.connect("mongodb://localhost:27017/student",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app = express();
        app.use("/api",route);
        app.listen(3000, () => {
            console.log('Server Started....!!');
        })
    }
);