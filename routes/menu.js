// routes/menu.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate('children');
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new menu item
router.post('/', async (req, res) => {
  const menuItem = new MenuItem({
    menu_name: req.body.menu_name,
    parent: req.body.parent,
    children: req.body.children
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
