const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('../routes/bookRoutes');
const mongoose = require('../config');
// const dotenv =  require('dotenv');

// // Leer el archivo de configuración
// dotenv.config({path:'./config/config.env'});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', bookRoutes);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (res, req) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});