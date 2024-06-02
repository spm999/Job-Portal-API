// models/resume.js
const db = require('../config/db');

const Resume = {
    create: (resumeData, callback) => {
        const query = 'INSERT INTO resumes (user_id, skills, experience, education) VALUES (?, ?, ?, ?)';
        db.query(query, [resumeData.user_id, resumeData.skills, resumeData.experience, resumeData.education], callback);
    },
    findBySkills: (skills, callback) => {
        const query = 'SELECT * FROM resumes WHERE skills LIKE ?';
        db.query(query, [`%${skills}%`], callback);
    }
};

module.exports = Resume;
