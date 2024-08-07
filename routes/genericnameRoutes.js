const express = require('express');
const genericname = express();

const multer = require('multer');
const path = require('path');
const bodyparser = require('body-parser');

genericname.use(bodyparser.urlencoded({extended:true}));
genericname.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads')
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    }
})

var upload = multer({ storage: storage });

const genericnameController = require('../controllers/genericnameController')

genericname.post('/import', upload.single('file'), (req, res) => {
    genericnameController.importgenricname(req, res);
});
module.exports = genericname;