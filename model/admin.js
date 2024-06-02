// models/admin.js
const db = require('../config/db');

const Admin = {
    create: (adminData, callback) => {
        const { name, email, password } = adminData;
        const query = 'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, password], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM admins WHERE email = ?';
        db.query(query, [email], callback);
    }
};

module.exports = Admin;
