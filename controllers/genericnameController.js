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


module.exports = {
    importgenricname
};