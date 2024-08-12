const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../Models/UserModel');
const authMiddleware = require('../Authentication/Middleware');
router.post('/register', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Validate required fields
      if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required.' });
      }

      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email is already registered.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      // Return a success message
      res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

  router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.sendStatus(401);
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KET, { expiresIn: 60 * 60 });
        res.json({ token, user_id: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get users
router.get('/', authMiddleware, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;