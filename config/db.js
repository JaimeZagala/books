const mongoose = require('mongoose');
// conndb = 'mongodb+srv://ifcd0210rafapm:Eb45ujVpIxW4vtR3@devcam.klinkrl.mongodb.net/?retryWrites=true&w=majority&appName=devcam';

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
}

module.exports = connectDB;