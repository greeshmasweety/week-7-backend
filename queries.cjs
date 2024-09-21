const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ username, email, password });
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Change password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid old password' });

        user.password = newPassword;
        await user.save();
        res.json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// Delete account
exports.deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ msg: 'Account deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};
