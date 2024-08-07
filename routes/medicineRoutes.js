const express = require('express');
const medicine = express();

const multer = require('multer');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const medicineController = require('../controllers/medicineController'); // Adjust the path to your controller

medicine.use(bodyparser.urlencoded({ extended: true }));
medicine.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

medicine.post('/importmedicine', upload.single('file'), (req, res) => {
    medicineController.importgenricname(req, res);
});

medicine.delete('/deletemedicinedata', (req, res) => {
    medicineController.deleteAllMedicineData(req, res);
});

module.exports = medicine;