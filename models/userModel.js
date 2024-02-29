const mongooes = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
    trim: true,
    maxLength: [40, 'A name must have less or equal 40 characters'],
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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('save', function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = bcrypt.hashSync(this.password, 10);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongooes.model('User', userSchema);
module.exports = User;
