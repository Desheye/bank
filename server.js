const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const generateAccountNumber = require('./utils/generateAccountNumber');
const fundTransferRoutes = require('./routes/fundTransferRoutes');
const session = require('express-session');
require('dotenv').config();

const app = express();



// Set up express-session
app.use(session({
  secret: process.env.secret_key, // Use the secret key from your .env file
  resave: false,
  saveUninitialized: true,
}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve node_modules as static files
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Mount user routes
app.use('/', userRoutes);

// Middleware to transfer funds
app.use(fundTransferRoutes);

// Define a route to serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to serve the welcome page
app.get('/welcome', (req, res) => {
  const { userName, accountNumber } = req.query;
  res.render('welcome', { userName, accountNumber });
});

// Define the new /accounts route
app.get('/accounts', (req, res) => {
  const { userName, balance } = req.query;
  res.render('accounts', { userName, balance });
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
