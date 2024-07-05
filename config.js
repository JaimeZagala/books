const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jaimezagala:j5MYOOH4DZEVpb4M@devcamp.thgyeoc.mongodb.net/?retryWrites=true&w=majority&appName=devcamp')
.then(() => {
	console.log('Connected to MongoDB');
}).catch((err) => {
	console.error('Error connecting to MongoDB: ', err);
});

module.exports = mongoose;