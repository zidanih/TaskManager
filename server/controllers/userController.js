const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ajouter d'autres méthodes (getUser, updateUser, etc.) ici...