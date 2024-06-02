// models/job.js
const db = require('../config/db');

const Job = {
    create: (jobData, callback) => {
        const query = 'INSERT INTO jobs (title, description, requirements, company) VALUES (?, ?, ?, ?)';
        db.query(query, [jobData.title, jobData.description, jobData.requirements, jobData.company], callback);
    }
};

module.exports = Job;
