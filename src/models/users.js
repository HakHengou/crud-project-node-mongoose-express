const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      isVisible:{
        list: false,
      }
    },
    role:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'roles'
    }  
  }
);


const User = mongoose.model('users', userSchema);
module.exports = User;
