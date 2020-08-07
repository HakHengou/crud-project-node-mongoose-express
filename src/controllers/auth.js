require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('../services/bcrypt');

exports.login = async (req, res) =>{
    const user = await User.findOne({ username: req.body.username});
    if(!user){
        return res.status(404).send({message: "Invalid Username !"});
    }
    const checkPassword = await bcrypt.comparePassword( req.body.password, user.password);
 
    
    if(!checkPassword){
        return res.status(404).send({message: "Invalid Password !"});
    }
    
    const data = { id : user.id, username: user.username};
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.status(200).send({token: token});

}

