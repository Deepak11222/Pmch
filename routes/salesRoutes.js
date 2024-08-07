const express = require('express');
const router = express.Router();
const { getTotalSales, getTodaysSales } = require('../controllers/salesController');

router.get('/total-sales', getTotalSales);
router.get('/todays-sales', getTodaysSales);

module.exports = router;