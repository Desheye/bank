// server.js

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const fundTransferRoutes = require('./routes/fundTransferRoutes');
const session = require('express-session');
const axios = require('axios'); // Import Axios
require('dotenv').config();

const app = express();

//set up API coonection
const NEWS_API_KEY = process.env.NEWS_API_KEY; // Store your API key in an environment variable

app.get('/financial-news', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                category: 'business',
                language: 'en',
                apiKey: NEWS_API_KEY
            }
        });
        const headlines = response.data.articles.map(article => article.title);
        res.json({ headlines });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send('Error fetching news');
    }
});


// Set up express-session
app.use(session({
  secret: process.env.SECRET_KEY,
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

// Mount fund transfer routes
app.use('/', fundTransferRoutes);

// Define a route to serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Define the /accounts route
app.get('/accounts', (req, res) => {
  console.log('Accounts Route - Hit');
  const userId = req.session.userId;
  console.log('userId:', userId);

  const { userName, balance } = req.query;
  const successfulTransfer = req.query.successfulTransfer === 'true';
  const transferAmount = req.query.transferAmount;
  const senderName = req.query.senderName;
  const receiverName = req.query.receiverName;
  const depositAmount = req.query.depositAmount;
  const depositorName = req.query.depositorName;

  res.render('accounts', { 
    userName: req.session.userName || userName, 
    balance: req.session.balance || balance, 
    successfulTransfer, 
    transferAmount, 
    senderName, 
    receiverName, 
    depositAmount, 
    depositorName 
  });
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
