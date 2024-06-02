// controllers/resumeController.js
const Resume = require('../model/resume');

exports.submitResume = (req, res) => {
    const { skills, experience, education } = req.body;
    const userId = req.userId; // Extracted from token by middleware

    Resume.findByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).send('Error checking existing resume.');
        }

        if (results.length > 0) {
            // Resume exists, update it
            Resume.update({ userId, skills, experience, education }, (err, result) => {
                if (err) {
                    return res.status(500).send('Error updating resume.');
                }
                res.status(200).send('Resume updated successfully.');
            });
        } else {
            // Resume does not exist, create a new one
            Resume.create({ userId, skills, experience, education }, (err, result) => {
                if (err) {
                    return res.status(500).send('Error submitting resume.');
                }
                res.status(201).send('Resume submitted successfully.');
            });
        }
    });
};

exports.listResumesBySkills = (req, res) => {
    const { skills } = req.params;

    Resume.findBySkills(skills, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching resumes.');
        }
        res.status(200).send(results);
    });
};
