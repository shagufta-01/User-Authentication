const mongoose = require('mongoose');

const usersdataschema = new mongoose.Schema({
    email:String,
    usersthoughts:String
});

const usersdata = mongoose.model('usersdata', usersdataschema);

module.exports = usersdata;
