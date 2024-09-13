var GenericName = require('../models/GenericName');
var csv = require('csvtojson');

const importgenricname = async (req, res) => {
    try {
        var genericNameData = [];
        const response = await csv().fromFile(req.file.path);
        
        for (let x = 0; x < response.length; x++) {
            genericNameData.push({
                genericName: response[x].genericName,
                status: response[x].status,
            });
        }

        await GenericName.insertMany(genericNameData);

        res.send({ status: 200, success: true, msg: 'CSV imported' });
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ status: 400, success: false, msg: error.message });
    }
};

const getgenericnames = async (req, res) => {
    try {
      const activeGenericNames = await GenericName.find({ status: 1 });
      res.json(activeGenericNames);
    } catch (error) {
      console.error('Error fetching active medicine types:', error);
      res.status(500).json({ message: 'Failed to fetch active medicine types' });
    }
};

const addgenericnames = async (req, res) => {
    const { genericName } = req.body;
  
    try {
      const status = determineStatusForGenericName(genericName); // Implement your business logic
      
      const newGenericName = new GenericName({
        genericName,
        status,
      });
  
      const savedGenericName = await newGenericName.save();
      res.status(201).json({ success: true, data: savedGenericName });
    } catch (error) {
      console.error('Error creating generic name:', error);
      res.status(500).json({ success: false, message: 'Failed to create generic name' });
    }
  };

// Exporting both functions
module.exports = {
    addgenericnames,
    importgenricname,
    getgenericnames
};