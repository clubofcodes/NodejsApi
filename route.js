const router = require('express').Router();
const Book = require('./Models/book');
const User = require('./Models/user');
const Videos = require('./Models/videos');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');

// 1st routes for books collection or book model
router.get("/bookdata", async (req, res) => {
    const book = await Book.find();
    res.send(book);
});

//inserting records
router.post("/bookdata", async (req, res) => {
    try {
        const book = new Book({
            name: req.body.name,
            qty: req.body.qty,
            author: req.body.author,
        });
        await book.save();
        res.send(book);
    } catch (error) {
        res.send(error);
    }
});

// '/bookdata/:id' is place holder
router.patch("/bookdata/:id", async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        book.name = req.body.name;
        book.qty = req.body.qty;
        book.author = req.body.author;

        await book.save();
        res.send(book);

    } catch (error) {
        res.send(error);
    }
});

//deleting records
router.delete("/bookdata/:id", async (req, res) => {
    await Book.deleteOne({ _id: req.params.id }, (err, d) => {
        if (err) return res.status(400).send({ error: "Book is not found!! No such data." });
        if (d.deletedCount > 0)
            res.send("Book data is deleted successfully");
        else
            res.send("Record doesn't exist or already deleted");
    });
});

//user registration
router.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(req.body.pwd, salt);
    const user = new User({
        username: req.body.uname,
        password: hashedPswd,
        token: req.body.pwd
    });

    await user.save();
    res.send(user);
});

//user login
router.patch('/signin/:uname', async (req, res) => {
    const user = await User.findOne({ username: req.body.uname });
    if (!user) return res.send("You are not registered..!!");
    const isValid = await bcrypt.compare(req.body.pwd, user.password);
    if (!isValid) {
        res.send("Wrong credentials or invalid User");
    } else {
        const token = jwt.sign({ _id: user._id }, "privatekey");
        res.header('auth-token', token);
        // res.send(token);

        user.token = token;
        await user.save();
        res.send(user);
    }
});

//fetch Authenticated using JWT "pvbooks=privatebooks"
router.get("/pvbooks", auth, (req, res) => {
    res.json({
        title: "Missing",
        desc: "Comming Soon"
    });
});

//-------------------videos api project------------------
router.get("/videosdata", auth, async (req, res) => {
    const videos = await Videos.find();
    res.send(videos);
});

//inserting records
router.post("/videosdata", auth, async (req, res) => {
    try {
        const videos = new Videos({
            title: req.body.title,
            desc: req.body.desc,
            url: req.body.url,
            cat: req.body.cat,
            posted_by: req.body.posted_by,
            likes: req.body.likes
        });
        await videos.save();
        res.send(videos);
    } catch (error) {
        res.send(error);
    }
});

// // '/bookdata/:id' is place holder
// router.patch("/videosdata/:id", auth, async(req,res)=>{
//     try {
//         const book = await Book.findOne({_id:req.params.id});
//         book.name = req.body.name;
//         book.qty = req.body.qty;
//         book.author = req.body.author;

//         await book.save();
//         res.send(book);

//     } catch (error) {
//         res.send(error);
//     }
// });

//deleting records
router.delete("/videosdata/:id", auth, async (req, res) => {
    await Videos.deleteOne({ _id: req.params.id }, (err, d) => {
        if (err) return res.status(400).send({ error: "Book is not found!! No such data." });
        if (d.deletedCount > 0)
            res.send("Book data is deleted successfully");
        else
            res.send("Record doesn't exist or already deleted");
    });
});

module.exports = router;