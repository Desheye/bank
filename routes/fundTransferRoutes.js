const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');
const User = require('../models/User');


router.get('/getBalance', async (req, res) => {
    try {
        // Get the user from the database
        const user = await User.findOne({ where: { id: req.user.id } }); // Replace with your condition

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send balance as JSON
        res.json({ balance: user.initial_balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching the balance' });
    }
});





// module.exports = router;


module.exports = router;
