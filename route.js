const express = require('express');
const Book = require('./Models/book');
const User = require('./Models/user');
const router = express.Router();

// 1st model for books collection
router.get("/bookdata",async (req,res)=>{
    const book = await Book.find();
    res.send(book);
});

router.post("/bookdata", async(req,res)=>{
    try {
        const book = new Book({
            name:req.body.name,
            qty:req.body.qty,
            authors:req.body.authors,
            address:req.body.address
        });
        await book.save();
        res.send(book);
    } catch (error) {
        res.send(error);
    }
});

// '/bookdata/:id' is place holder
router.patch("/bookdata/:id", async(req,res)=>{
    try {
        const book = await Book.findOne({_id:req.params.id});
        book.name = req.body.name;
        book.qty = req.body.qty;
        book.authors = req.body.authors;
        book.address = req.body.address;

        await book.save();
        res.send(book);

    } catch (error) {
        res.send(error);
    }
});

router.delete("/bookdata/:id", async(req,res)=>{
    await Book.deleteOne({_id: req.params.id}, (err, d) => {
        if (err) return res.status(400).send({error:"Book is not found!! No such data."});
        if (d.deletedCount > 0 )
            res.send("Book data is deleted successfully");
        else
            res.send("Record doesn't exist or already deleted");
    });
});

// 2nd model for users collection
router.get("/userdata",async (req,res)=>{
    const user = await User.find();
    res.send(user);
});

module.exports = router;