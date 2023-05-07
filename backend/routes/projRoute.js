const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ProjModel} = require('../models/projModel');

// Create a new organization document
router.post('/create', async (req, res) => {
    const { name, description, cost, donations, amount_raised,Type,Audit,Picture,organization} = req.body;

    try {
      const proj = await ProjModel.create({
        name,
        description,
        cost,
        donations,
        amount_raised,
        Type,
        Audit,
        Picture,
        organization
      });
      res.status(201).json({ proj });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;