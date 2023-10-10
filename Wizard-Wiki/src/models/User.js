const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    requred: [true, 'First name is required!'],
    minLength: [3, 'First name should be atleast three characters long!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required!'],
    minLength: [3, 'Last name should be atleast three characters long!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
    minLength: [10, 'Email should be atleast ten characters long!'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email',
    ],
  },
  password: {
    type: String,
    minlength: [4, 'The password should be atleat four characters long!'],
    required: [true, 'Password is required!'],
  },
});

userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new Error("Passwords don't match!");
  }
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
