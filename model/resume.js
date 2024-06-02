// models/resume.js
const db = require('../config/db');

const Resume = {
    create: (resumeData, callback) => {
        const query = 'INSERT INTO resumes (userId, skills, experience, education) VALUES (?, ?, ?, ?)';
        db.query(query, [resumeData.userId, resumeData.skills, resumeData.experience, resumeData.education], callback);
    },
    findByUserId: (userId, callback) => {
        const query = 'SELECT * FROM resumes WHERE userId = ?';
        db.query(query, [userId], callback);
    },
    update: (resumeData, callback) => {
        const query = 'UPDATE resumes SET skills = ?, experience = ?, education = ? WHERE userId = ?';
        db.query(query, [resumeData.skills, resumeData.experience, resumeData.education, resumeData.userId], callback);
    },
    findBySkills: (skills, callback) => {
        const skillsArray = skills.split(',');
        const query = 'SELECT * FROM resumes WHERE ' + skillsArray.map(skill => 'skills LIKE ?').join(' OR ');
        const queryParams = skillsArray.map(skill => `%${skill.trim()}%`);
        db.query(query, queryParams, callback);
    }
};

module.exports = Resume;
