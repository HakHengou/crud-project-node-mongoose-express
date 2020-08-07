const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    image:{
      type: String,
      require: true
    },
    gender:{
        type: String,
        required: false,
        default: 'other'
    },
    age:{
        type: Number,
        required: true,
    },
    birthPlace:{
        type: String,
        required: true
    },
    birthDay:{
        type: Date,
        required: false
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
);

const Profile = mongoose.model('profiles', profileSchema);
module.exports = Profile;
