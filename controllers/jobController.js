// controllers/jobController.js
const Job = require('../model/job');

exports.createJob = (req, res) => {
    const { job_code, title, description, requirements, company } = req.body;

    // Check if the job_code already exists
    Job.findOne(job_code, (err, existingJob) => {
        if (err) {
            return res.status(500).send('Error checking for existing job.');
        }
        if (existingJob) {
            return res.status(400).send('Job with the same job_code already exists.');
        }

        // If job_code is not present, create the job
        Job.create({ job_code, title, description, requirements, company }, (err, result) => {
            if (err) {
                return res.status(500).send('Error creating job.');
            }
            res.status(201).send('Job created successfully.');
        });
    });
};
