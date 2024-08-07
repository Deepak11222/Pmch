const mongoose = require('mongoose');
const MedicineData = require('../models/MedicineData');
const csv = require('csvtojson');

const importgenricname = async (req, res) => {
    try {
        const medicineDataArray = [];
        const response = await csv().fromFile(req.file.path);

        for (let x = 0; x < response.length; x++) {
            const storeId = response[x].storeId;
            const medicineId = response[x].medicineId;

            // Validate and convert to ObjectId
            if (mongoose.Types.ObjectId.isValid(storeId) && mongoose.Types.ObjectId.isValid(medicineId)) {
                medicineDataArray.push({
                    storeId: mongoose.Types.ObjectId(storeId),
                    medicineId: mongoose.Types.ObjectId(medicineId),
                    medicineType: response[x].medicineType,
                    supplierName: response[x].supplierName,
                    batchNumber: response[x].batchNumber,
                    paymentMode: response[x].paymentMode,
                    paymentStatus: response[x].paymentStatus,
                    expiryDate: response[x].expiryDate,
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
            } else {
                throw new Error(`Invalid storeId or medicineId at row ${x + 1}`);
            }
        }

        await MedicineData.insertMany(medicineDataArray);

        res.send({ status: 200, success: true, msg: 'CSV imported' });
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ status: 400, success: false, msg: error.message });
    }
};

module.exports = {
    importgenricname
};
