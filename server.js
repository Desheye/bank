const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Define a Sequelize model for the 'users' table
const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confirm_password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  resetToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetTokenExpiration: {
    type: DataTypes.DATE,
    allowNull: true
  }
});


// Sync the Sequelize model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Initialize express
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve node_modules as static files
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Define a route to serve the home page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to serve the forgot password page (forgot.html)
app.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forgot.html'));
});

// Define a route to serve the welcome page
app.get('/welcome', (req, res) => {
    const { userName } = req.query;
    res.render('welcome', { userName });
});

// Insert User
app.post('/adduser', async (req, res) => {
    try {
        const { full_name, phone, email, password, confirm_password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            full_name,
            phone,
            email,
            password: hashedPassword,
            confirm_password
        });
        res.send('User inserted successfully!');
    } catch (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('User insertion failed: ' + err.message);
    }
});

app.post('/signup', async (req, res) => {
  try {
      const { full_name, phone, email, password, confirm_password } = req.body;
      if (password !== confirm_password) {
          return res.status(400).json({ error: 'Passwords do not match.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
          full_name,
          phone,
          email,
          password: hashedPassword,
          confirm_password: hashedPassword
      });
      res.status(200).json({ message: 'Signup successful. Data saved to the database.', user });
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
          res.redirect(`/welcome?userName=${encodeURIComponent(user.full_name)}`);
      } else {
          res.status(401).json({ error: 'Incorrect password.' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
  }
});

//reset password implementation
app.post('/reset-password', async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
          return res.status(404).json({ error: 'Email not found.' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

      user.resetToken = resetToken;
      user.resetTokenExpiration = resetTokenExpiration;
      await user.save();

      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      console.log(`Password reset link: ${resetLink}`);

      res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).json({ error: 'An error occurred during password reset.' });
  }
});

// Serve reset password page
app.get('/reset-password/:token', async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({ where: { resetToken: token, resetTokenExpiration: { [Op.gt]: Date.now() } } });

  if (!user) {
      return res.status(400).send('Invalid or expired token.');
  }

  res.render('reset', { token });
});

// Handle password reset form submission
app.post('/reset-password', async (req, res) => {
  const { token, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
  }

  const user = await User.findOne({ where: { resetToken: token, resetTokenExpiration: { [Op.gt]: Date.now() } } });

  if (!user) {
      return res.status(400).send('Invalid or expired token.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.confirm_password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  res.send('Password has been reset successfully.');
});




// Your other routes here...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
