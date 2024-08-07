const Order = require('../models/order');

async function getTotalSales(req, res) {
  try {
    // Sum the grandTotal of all orders
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$grandTotal" }
        }
      }
    ]);

    // Access the total sales value
    const totalSalesAmount = totalSales[0] ? totalSales[0].total : 0;
    
    // Send the total sales amount as a response
    res.json({ totalSales: totalSalesAmount });
  } catch (error) {
    console.error("Error calculating total sales:", error);
    res.status(500).json({ message: "Error calculating total sales" });
  }
}

const getTodaysSales = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const todaysSales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$grandTotal" }
        }
      }
    ]);

    res.status(200).json({ total: todaysSales[0]?.total || 0 });
  } catch (error) {
    console.error("Error fetching today's sales:", error);
    res.status(500).json({ message: "Error fetching today's sales" });
  }
};

module.exports = {
  getTotalSales,
  getTodaysSales
};