const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const mongoose = require('./config');
// const dotenv =  require('dotenv');

// // Leer el archivo de configuración
// dotenv.config({path:'./config/config.env'});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
