const express = require('express');
const Book = require('./Models/book');
const User = require('./Models/user');
const router = express.Router();

router.get("/bookdata",async (req,res)=>{
    const book = await Book.find();
    res.send(book);
});

router.get("/userdata",async (req,res)=>{
    const user = await User.find();
    res.send(user);
});

module.exports = router;