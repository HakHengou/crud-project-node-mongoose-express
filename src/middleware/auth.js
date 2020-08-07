const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Profile = require('../models/profiles');

exports.isAuthenticated = async (req, res, next) => {
    const authenticationHeader = req.headers.authentication;
    if (!authenticationHeader){
        return res.status(401).send({message: "No Token Provided !"});
    }
    const token = authenticationHeader;
    
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) =>{
        if(err){
            return res.status(403).send({message:'Authentication not match !'})
        }
        const userToken = jwt.verify(token,process.env.JWT_SECRET);
        const auth = await User.findById(userToken.id);
        if(!auth){
            return res.status(403).send({message: 'Invalid Token !'});
        }

        // const auth = await User.findOne({_id: user.id});
        req.auth = auth;
        // console.log(auth)
        next();
    });
}


exports.isAuthorized = async (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({message: 'No token provided!'})
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(403).send({message: 'Invalid Token !'});
        }
        req.user = user;
    } catch (error) {
        return res.status(403).send({message: 'Authorizing not match !'})
    }
    next()
}
