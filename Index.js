const express = require('express');
const mongoose  = require('mongoose');
const route = require('./route');

//connect to mondodb 
mongoose.connect("mongodb+srv://RJ:N443r03-@cluster0.dybb0.mongodb.net/students?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>{
        const app = express();
        app.use("/api",route);
        app.listen(process.env.PORT || 3000, () => {
            console.log('Server Started....!!');
        })
    }
);