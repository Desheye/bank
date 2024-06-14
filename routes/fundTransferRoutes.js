//routes/fundTransferRoutes

const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');
const User = require('../models/User');

// Fetch receiver details by account number
router.get('/users/:accountNumber', async (req, res) => {
    const accountNumber = req.params.accountNumber;
    try {
        const user = await User.findOne({ where: { account_number: accountNumber } });
        res.json(user ? { name: user.full_name } : {});
    } catch (err) {
        console.error('Error fetching receiver details:', err);
        res.status(500).send('Error fetching receiver details');
    }
});

// Handle transfer
router.post('/transfer', async (req, res) => {
    const { amount, receiverAccountNumber } = req.body;
    const userId = req.session.userId;  // Assuming user ID is stored in session

    console.log('Starting transaction');

    const transaction = await sequelize.transaction();

    try {
        // Fetch sender details
        console.log('Fetching sender details');
        const sender = await User.findOne({ where: { id: userId } }, { transaction });
        if (!sender) throw new Error('Sender not found');
        const senderBalance = sender.current_balance;
        const senderName = sender.full_name;
        console.log('Sender balance:', senderBalance);

        if (senderBalance < amount) {
            console.log('Insufficient balance');
            return res.status(400).send('Insufficient balance');
        }

        // Fetch receiver details
        console.log('Fetching receiver details');
        const receiver = await User.findOne({ where: { account_number: receiverAccountNumber } }, { transaction });
        if (!receiver) {
            console.log('Receiver not found');
            return res.status(404).send('Receiver not found');
        }
        const receiverName = receiver.full_name;
        console.log('Receiver details:', receiver);

        // Update sender balance
        console.log('Updating sender balance');
        sender.current_balance -= amount;
        await sender.save({ transaction });

        // Update receiver balance
        console.log('Updating receiver balance');
        receiver.current_balance += amount;
        await receiver.save({ transaction });

        // Commit transaction
        await transaction.commit();
        console.log('Transaction successful');
        
        // Update session with the new balance
        req.session.balance = sender.current_balance;
        req.session.userName = sender.full_name;

        // Redirect to /accounts with query parameters
        res.redirect(`/accounts?successfulTransfer=true&transferAmount=${amount}&senderName=${encodeURIComponent(senderName)}&receiverName=${encodeURIComponent(receiverName)}`);
    } catch (err) {
        console.error('Transaction error:', err);
        await transaction.rollback();
        res.status(500).send('Transaction failed');
    }
});

//module.exports = router;

module.exports = router;

