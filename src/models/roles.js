const mongoose = require('mongoose');
const User = require('./users');

const roleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    level:{
        type: Number,
        required: true,
        unique: true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
})

const Role = mongoose.model('roles', roleSchema);
module.exports = Role;