// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ name, email, password: hashedPassword }, (err, result) => {
        if (err) {
            return res.status(500).send('Error creating user.');
        }
        res.status(201).send('User created successfully.');
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

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
};
