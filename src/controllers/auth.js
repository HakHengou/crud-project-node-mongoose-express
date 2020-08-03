const User = require('../models/users');
const bcrypt = require('./bcrypt');

exports.signin = async (req, res) =>{
    const {username,password} = req.body;
    const found = await User.findOne({ username: username});
    if(!found){
        return res.status(404).send({message: "Invalid Username !"});
    }
    // console.log(found.password,password)
    const checkPassword = await bcrypt.comparePassword(found.password, password);
 
    
    if(!checkPassword){
        return res.status(404).send({message: "Invalid Password !"});
    }
    res.status(200).send({message: "Login Sucessed !"})
}

