var MedicineData = require('../models/MedicineData');
var csv = require('csvtojson');

const importgenricname = async (req, res) => {
    try {
        var MedicineDatas = [];
        const response = await csv().fromFile(req.file.path);
        
        for (let x = 0; x < response.length; x++) {
            MedicineDatas.push({
                  storeId: response[x].storeId,
                  medicineId: response[x].medicineId,
                medicineType: response[x].medicineType,
                supplierName: response[x].supplierName,
                batchNumber: response[x].batchNumber,
                paymentMode: response[x].paymentMode,
                paymentStatus: response[x].paymentStatus,
                expiryDate: response[x].expiryDate,
                // expiryDate: response[x].expiryDate,
                // batchNumber: response[x].batchNumber,
                packing: response[x].packing,
                unit: response[x].unit,
                qty: response[x].qty,
                perboxStrips: response[x].perboxStrips,
                mrpPrice: response[x].mrpPrice,
                supplierDiscount: response[x].supplierDiscount,
                supplierPrice: response[x].supplierPrice,
                discount: response[x].discount,
                netSP: response[x].netSP,
                gst: response[x].gst,
                salesPrice: response[x].salesPrice,
                createdDate: response[x].createdDate,
                createdBy: response[x].createdBy,                              
            });
        }

        await MedicineData.insertMany(MedicineDatas);

        res.send({ status: 200, success: true, msg: 'CSV imported' });
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ status: 400, success: false, msg: error.message });
    }
};


module.exports = {
    importgenricname
};