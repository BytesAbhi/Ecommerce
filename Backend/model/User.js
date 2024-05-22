
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String } 
});

const User = mongoose.model('Newnewuser', userSchema);

module.exports = User;
