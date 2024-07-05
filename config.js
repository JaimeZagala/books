const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ifcd0210rafapm:Eb45ujVpIxW4vtR3@devcam.klinkrl.mongodb.net/?retryWrites=true&w=majority&appName=devcam', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then (() => {
    console.log('Connected  to MongoDB');
}).catch((err) => {
    console.error('Error conecting to MongoDB', err);
});

module.exports = mongoose;