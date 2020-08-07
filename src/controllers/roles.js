const Role = require('../models/roles');
const User = require('../models/users');

exports.createRole = async (req, res) =>{
    const role = new Role({
        ...req.body
    });
    await role.save();
    return res.status(200).send(role);
}

exports.getRole = async (req, res) =>{
    const roles = await Role.find({}).populate({path: 'users', select: 'username'});
    return res.status(200).send(roles);
}

exports.deleteRole = async (req, res) =>{
    try {
        const deleted = await User.deleteOne({_id: req.params.id});
        if(deleted.n === 0){
            return res.status(400).send({message: 'Not found !'});
        }
        return res.status(200).send({message: 'Deleted !'});
    } catch (error) {
        return res.status(400).send({message: 'Delete Faile !', error: error})
    }    
}

exports.updateRole = async (req, res) =>{
    try {
        await Role.update({_id: res.params.id}, req.body);
        return res.status(200).send({message: 'Updated !'});
    } catch (error) {
        return res.status(400).send({message: 'Update Faile !'})
    }
}