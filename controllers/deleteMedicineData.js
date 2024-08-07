const mongoose = require('mongoose');
const Medicine = require('../models/Medicine'); // Adjust the path to your Medicine model

const dbURI = 'your-mongodb-uri'; // Replace with your MongoDB URI

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
        deleteAllMedicineData();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

const deleteAllMedicineData = async () => {
    try {
        const result = await Medicine.deleteMany({});
        console.log(`Deleted ${result.deletedCount} documents from the Medicine collection`);
        mongoose.connection.close();
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
};