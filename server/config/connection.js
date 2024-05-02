require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://new_user176:Mineatlasuser1515@cluster0.kxdd5aq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
