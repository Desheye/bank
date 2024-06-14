//routes/userRoutes

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateAccountNumber = require('../utils/generateAccountNumber');
const sequelize = require('../config/db');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    console.log('Signup route hit');
    try {
        const { full_name, phone, email, password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const account_number = generateAccountNumber();
        const user = await User.create({
            full_name,
            phone,
            email,
            password: hashedPassword,
            account_number,
            current_balance: 50000, // Setting initial balance
        });
        // Redirect to the welcome page with userName and accountNumber as query parameters
        res.redirect(`/welcome?userName=${encodeURIComponent(full_name)}&accountNumber=${encodeURIComponent(account_number)}`);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'An error occurred during signup.' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    console.log('Login route hit');
    try {
        const { account_number, password } = req.body;
        if (!account_number || !password) {
            return res.status(400).json({ error: 'Account number and password are required.' });
        }

        // Find user by account_number
        const user = await User.findOne({ where: { account_number } });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Log the user data
        console.log(user.dataValues);

        // Compare provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Store user id in the session
            req.session.userId = user.id;

            // Redirect to /currentBal
            res.redirect('/currentBal');
        } else {
            return res.status(401).json({ error: 'Incorrect password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});

// Accounts: Current Balance
router.get('/currentBal', async (req, res) => {
    console.log('Account: Current Balance Hit Route');

    const userId = req.session.userId;
    console.log('userId:', userId);

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (user) {
            const balance = user.current_balance;
            const userName = user.full_name;
            console.log('Balance:', balance);
            console.log('UserName:', userName);

            // Store the balance and username in the session
            req.session.balance = balance;
            req.session.userName = userName;

            // Redirect to the /accounts route
            res.redirect('/accounts');
        } else {
            console.log('No user found with id:', userId);
            res.send('User Not Found');
        }
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
});

module.exports = router;

