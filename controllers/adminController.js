// controllers/adminController.js
const Admin = require('../model/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = (req, res) => {
    const { name, email, password } = req.body;

    // Check if admin with same email already exists
    Admin.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).send('Error creating admin.');
        }
        if (results.length > 0) {
            return res.status(400).send('Admin with this email already exists.');
        }

        // If not, hash the password and create the admin user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error creating admin.');
            }

            Admin.create({ name, email, password: hashedPassword }, (err, result) => {
                if (err) {
                    return res.status(500).send('Error creating admin.');
                }
                res.status(201).send('Admin created successfully.');
            });
        });
    });
};

exports.loginAdmin = (req, res) => {
    const { email, password } = req.body;

    // Find admin user by email
    Admin.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).send('Error logging in.');
        }

        if (results.length === 0) {
            return res.status(404).send('Admin not found.');
        }

        const admin = results[0];

        // Compare passwords
        bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send('Error logging in.');
            }

            if (!isMatch) {
                return res.status(401).send('Invalid credentials.');
            }

            // Generate JWT token with role information
            const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, 'secret', { expiresIn: '1h' });
            res.status(200).json({ auth: true, token: token });
        });
    });
};
