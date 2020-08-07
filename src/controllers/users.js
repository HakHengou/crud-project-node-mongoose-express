const User = require('../models/users');
const Role = require('../models/roles');

const bcrypt = require('../services/bcrypt');
const jwt = require('jsonwebtoken');
const getToken = require('../services/get-token');

exports.createUser = async (req, res) =>{
    req.body.password = await bcrypt.hashPassword(req.body.password);
    const user = new User({
        ...req.body
    });
    try {
        await user.save();
        await Role.updateOne({_id: req.body.roleId},{$push:{users: user.id}});
        res.status(201).send({id: user.id,username: user.username});
    } catch (e) {
        console.log(e)
        res.status(400).send({message: 'User are exist or missed fill!'});
    }
}

exports.getUser = async (req, res) =>{
    const levelUser = await getToken.getLevel(req.headers.authorization);
    try{
        const users = await User.find().select('username').populate('role');
        
        var showDataId = [];
        users.forEach(element => {
            let level = element.role.level;
            if(levelUser <= level){
                showDataId.push(element.id)
            }
        });
        const limit = +req.query.limit || 5;
        const offset= +req.query.offset || 0;
        const user = await User.find().select('username').where({_id: showDataId}).limit(limit).skip(offset).populate({path: 'role', select: 'name'});
        const total = user.length;
        const data = user.slice(offset, limit + offset);

        // const users = await User.find({  role: { $ne: null } }).select('username').populate({
        //     path:'role',select: 'name', match: { level: { $gte: levelUser} }
        // });
        // const limit = +req.query.limit || 5;
        // const offset= +req.query.offset || 0;
        // const total = users.length;
        // const data = users.slice(offset, limit + offset);
        
        res.send({
            data: data,
            metadata:{
                limit: limit, offset: offset, total: total
            }
        });
    } catch(e){
        res.status(400).send({message: "Error !", error: e})
    }
}

exports.getUserById = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id).populate('roleId');
        res.send(user)
    } catch(e){
        res.status(400).send({message: `User Id ${req.params.id} not found`})
    }
}

exports.updateUser = async (req, res) =>{
    try{
        await User.update({_id: req.params.id}, req.body);
        res.status(200).send({message: "Updated !"})
    } catch(e){
        res.status(400).send({message: "Bad request"});
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const isDeleted = await User.deleteOne({_id: req.params.id});
        if(isDeleted.n === 0){
            return res.status(400).send({message: "Not Found!"});
        }
        res.status(200).send({message: "Deleted !"})
    }catch(e){
        return res.status(404).send({message: 'Not Found !',error: e});
    }
}