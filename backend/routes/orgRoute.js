const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Org = require('../models/orgModel');

// Create a new organization document
router.post('/create', async (req, res) => {
    const { name, description, phone, location, email } = req.body;

    try {
      const org = await Org.create({
        name,
        description,
        phone,
        location,
        email
      });
      res.status(201).json({ org });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;
