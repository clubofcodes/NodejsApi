const express = require('express');
const Book = require('./Models/book');
const router = express.Router();

router.get("/fetchdata",async (req,res)=>{
    const book = await Book.find();
    res.send(book);
});

module.exports = router;