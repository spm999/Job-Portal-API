// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists
    User.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).send('Error checking user email.');
        }
        if (results.length > 0) {
            return res.status(400).send('Email is already in use.');
        }

        // If email does not exist, proceed to create user
        const hashedPassword = bcrypt.hashSync(password, 8);
        User.create({ name, email, password: hashedPassword, role: 'user' }, (err, userId) => {
            if (err) {
                return res.status(500).send('Error creating user.');
            }
            res.status(201).send({ message: 'User created successfully.', userId }); // Return user ID
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('User not found.');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password.');
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: 'user'}, 'secret', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token, userId: user.id }); // Return user ID
    });
};
