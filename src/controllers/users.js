const User = require('../models/users');
// import {hashPassword} from './bcrypt';

const bcrypt = require('./bcrypt');


exports.createUser = async (req, res) =>{
    console.log(req.body)
    
    const {username, password} = req.body;
    
    const user = new User({
        username,
        password: await bcrypt.hashPassword(password) 
    });
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send({message: "Error"})
    }
}
exports.getUser = async (req, res) =>{
    try{
        const users = await User.find();
        res.send(users)
    } catch(e){
        res.send(e)
    }
}
exports.getUserById = async (req, res) =>{
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        res.send(user)
    } catch(e){
        res.send({message: `User Id ${id} not found`})
    }
}
exports.updateUser = async (req, res) =>{
    const id = req.params.id;
    try{
        await User.update({_id: id}, req.body);
        res.status(200).send({message: "Updated !"})
    } catch(e){
        res.status(400).send({message: "bad request"})
    }
}
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        await User.deleteOne({_id: id})
        res.status(200).send({message: "Deleted !"})
    }catch(e){
        res.status(400).send(e)
    }
}