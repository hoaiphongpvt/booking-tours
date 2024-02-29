const mongooes = require('mongoose');
const validator = require('validator');

const userSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
    trim: true,
    maxLength: [40, 'A name must have less or equal 40 characters'],
    minLength: [10, 'A name must have greater 10 characters'],
    validate: [validator.isAlpha, 'A name must have only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email!'],
    unique: true,
    lowercase: true,
    maxLength: [40, 'A email must have less or equal 40 characters'],
    minLength: [10, 'A email must have greater 10 characters'],
    validate: [validator.isEmail, 'Email must be in correct format'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
  },
});

const User = mongooes.model('User', userSchema);
module.exports = User;
