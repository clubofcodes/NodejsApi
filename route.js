const router = require('express').Router();
const Book = require('./Models/book');
const Student = require('./Models/student');
const User = require('./Models/alluser');
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
//updating records and '/bookdata/:id' is place holder
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

// 2nd routes for student collection or 'student' model
//fetch studentslist after Authentication using JWT.
router.get("/students", auth, async (req, res) => {
    const students = await Student.find();
    res.send(students);
});
//to find particular students using enrollment no.
router.get("/students/:uid", async (req, res) => {
    const students = await Student.find({ uid: req.params.uid });
    res.send(students);
});
//inserting student
router.post("/students", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(req.body.password, salt);
    const student = new Student({
        fullname: req.body.fullname,
        uid: req.body.uid,
        username: req.body.username,
        password: hashedPswd,
        department: req.body.department,
        cellno: req.body.cellno,
        dob: req.body.dob,
        gender: req.body.gender,
        token: req.body.pwd
    });
    console.log(student);
    await student.save();
    res.send(student);
});
//updating student
router.patch("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        student.fullname = req.body.fullname;
        student.cellno = req.body.cellno;

        await student.save();
        res.send(student);

    } catch (error) {
        res.send(error);
    }
});
//delete student
router.delete("/students/:id", async (req, res) => {
    await Student.deleteOne({ _id: req.params.id }, (err, d) => {
        if (err) return res.status(400).send({ error: "User is not found!! No such data." });
        if (d.deletedCount > 0)
            res.send("User data is deleted successfully");
        else
            res.send("Record doesn't exist or already deleted");
    });
});

//-------------------JSONWebToken Api Routes------------------
//user registration using authentication(jwt)
router.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPswd = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        fullname: req.body.fullname,
        acc_id: req.body.email,
        password: hashedPswd,
    });
    console.log(user);
    await user.save();
    res.send(user);
});
//user login using authentication(jwt)
router.post('/login', async (req, res) => {
    const user = await User.findOne({ acc_id: req.body.email });
    if (!user) return res.send("You are not registered..!!");
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        const invalidUser = "Wrong credentials or invalid User";
        res.send({invalidUser});
    } else {
        const token = jwt.sign({ _id: user._id }, "privatekey");
        // res.header('auth-token', token);
        console.log(token);
        res.send({token});
    }
});

//user login using authentication(jwt)
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
//-------------------JSON Web Token Api Routes------------------

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