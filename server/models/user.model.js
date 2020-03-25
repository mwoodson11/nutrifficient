const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
  type: String,
  required: true,
  unique: true,
  trim: true
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  height: {
    type: Number,
    required: false,
    unique: false
  },
  weight: {
    type: Number,
    required: false,
    unique: false
  },
  gender: {
    type: Number,
    required: false,
    unique: false
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;