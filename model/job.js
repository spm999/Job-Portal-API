// models/job.js
const db = require('../config/db');

const Job = {
    create: (jobData, callback) => {
        const { job_code, title, description, requirements, company } = jobData;

        // Convert array to string
        const requirementsString = JSON.stringify(requirements);

        const query = 'INSERT INTO jobs (job_code, title, description, requirements, company) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [job_code, title, description, requirementsString, company], (err, result) => {
            if (err) {
                console.error('Error creating job:', err);
                return callback(err);
            }
            callback(null, result.insertId);
        });
    },

    findOne: (jobCode, callback) => {
        const query = 'SELECT * FROM jobs WHERE job_code = ?';
        db.query(query, [jobCode], (err, result) => {
            if (err) {
                console.error('Error finding job:', err);
                return callback(err);
            }
            if (result.length === 0) {
                return callback(null, null); // Job not found
            }
            callback(null, result[0]); // Return the first job found
        });
    }
};

module.exports = Job;
