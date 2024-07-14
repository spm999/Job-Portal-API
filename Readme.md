# Job Portal API

This is a Job Portal API built with Node.js, Express, and MySQL. The API supports user authentication, admin authentication, job creation, and fetching resumes based on skills.

## Features

- User Registration and Login
- Admin Registration and Login
- Create Job Listings
- Submit and Update Resumes
- Fetch Resumes Based on Skills
- Role-Based Authentication

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT (JSON Web Token)
- bcrypt.js

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/spm999/Job-Portal-API.git
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Set up the MySQL database:

   > Create a database named `job_portal`.
   >

   > Run the SQL script to create the necessary tables.
   >
4. Start the server:

   ```
    npm start
   ```

## API Endpoints

### User Endpoints

**Sign Up:  `POST /user/signup`**

**Login:  `POST /user/login`**

**Resume Submit:  `POST /user/submitResume`**

### Admin Endpoints

**Sign Up:  `POST /admin/signup`**

**Login:  `POST /admin/login`**

**Job Create:  `POST /admin/jobCreate`**

**List Resumes: `GET /admin/list/:skill`**
