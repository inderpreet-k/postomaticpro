const bcrypt = require('bcryptjs');
   const jwt = require('jsonwebtoken');
   const User = require('../models/User');

   // Register new user
   exports.signup = async (req, res) => {
     try {
       const { name, email, password } = req.body;

       // Check if user already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
         return res.status(400).json({ message: 'Email already registered' });
       }

       // Hash password
       const hashedPassword = await bcrypt.hash(password, 12);

       // Create new user
       const user = await User.create({
         name,
         email,
         password: hashedPassword
       });

       // Create token
       const token = jwt.sign(
         { userId: user._id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: '7d' }
       );

       res.status(201).json({
         message: 'User created successfully',
         token,
         user: { id: user._id, name: user.name, email: user.email }
       });
     } catch (error) {
       res.status(500).json({ message: 'Error creating user', error: error.message });
     }
   };

   // Login user
   exports.login = async (req, res) => {
     try {
       const { email, password } = req.body;

       // Find user
       const user = await User.findOne({ email });
       if (!user) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }

       // Check password
       const isValidPassword = await bcrypt.compare(password, user.password);
       if (!isValidPassword) {
         return res.status(401).json({ message: 'Invalid email or password' });
       }

       // Create token
       const token = jwt.sign(
         { userId: user._id, email: user.email },
         process.env.JWT_SECRET,
         { expiresIn: '7d' }
       );

       res.status(200).json({
         message: 'Login successful',
         token,
         user: { id: user._id, name: user.name, email: user.email }
       });
     } catch (error) {
       res.status(500).json({ message: 'Error logging in', error: error.message });
     }
   };