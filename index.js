// app.js
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const adminRoutes=require('./routes/adminRoutes')

app.use(bodyParser.json());

app.use('/user', authRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
