const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('../config');
const path = require('path');

// const dotenv = require('dotenv');
// dotenv.config({path: 'config.env'});

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on ${process.env.NODE_ENV} on port ${port}`));