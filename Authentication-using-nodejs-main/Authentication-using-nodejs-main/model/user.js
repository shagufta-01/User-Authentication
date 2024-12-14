const mongoose = require('mongoose');

const signupdataschema = new mongoose.Schema({
    username: String,
    email:  { type: String, required: true ,unique :true},
    password: String,
});

const SignupDetails = mongoose.model("SignupDetails", signupdataschema);

module.exports = SignupDetails;
