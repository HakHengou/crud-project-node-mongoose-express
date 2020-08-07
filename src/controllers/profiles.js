const Profile = require('../models/profiles');
const jwt = require('jsonwebtoken');

exports.createProfile = async (req, res) =>{
    const token = req.headers.authentication;
    const {firstName, lastName, age, birthPlace, birthDay} = req.body;
    const decoded = await jwt.verify(token,process.env.JWT_SECRET);
    const profile = new Profile({
        // ...req.body,
        firstName,
        lastName, 
        age, 
        birthPlace, 
        birthDay,
        users: decoded.id,
        image: req.file.path
    });
    await profile.save();
    return res.status(200).send(profile);
}

exports.getProfile = async (req, res) =>{
    const profiles = await Profile.find({});
    const limit = +req.query.limit || 5;
    const offset= +req.query.offset || 0;
    const total = profiles.length;
    const data = profiles.slice(offset, limit + offset);

    return res.status(200).send({
        data: data, 
        metadata:{
            limit: limit, offset: offset, total: total
        }
    });
}

exports.updateProfile = async (req, res) =>{
    try{
        let isUpdated = await Profile.update({_id: req.params.id}, req.body);
        console.log(isUpdated)
        if(isUpdated.n === 0){
            return res.status(404).send({message: 'Not Found !'});
        }
        res.status(200).send({message: "Updated !"})
    } catch(e){
        res.status(400).send({message: "bad request", error: e});
    }
}

exports.deleteProfile = async (req, res) => {
    try{
        let isDeleted = await Profile.deleteOne({_id: req.params.id});
        if(isDeleted.n === 0){
            return res.status(404).send({message: 'Not Found !'});
        }
        return res.status(200).send({message: 'Deleted !'});
    }catch(e){
        return res.status(404).send({message: 'Not Found !', error: e});
    }
}

exports.upload = async ( req, res) => {
    console.log(req.file.upload)
    return res.send({message: 'Uploaded !'});
}
