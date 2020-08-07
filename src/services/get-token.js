const jwt = require('jsonwebtoken');

const User = require('../models/users')

exports.getLevel = async token =>{
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken.id).select('id').populate('role');
    return user.role.level;
}