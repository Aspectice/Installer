const express = require("express");
const fs = require("fs");
const multer  = require('multer');
const path = require('path');

const bodyParser = require("body-parser");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage:storage});

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function() {
    console.log("Server Ready!");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', upload.single('uploaded_file'), function (req, res) {
    fs.renameSync(req.file.path, req.file.path.replace(req.file.originalname, 
    req.body.file_name + path.extname(req.file.filename)));
    res.redirect("/");
 });
