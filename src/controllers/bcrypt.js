const bcrypt = require('bcrypt');

exports.hashPassword = async password =>{
    console.log(await bcrypt.genSalt())
    return bcrypt.genSalt().then(s => bcrypt.hash(password, 10));
}
exports.comparePassword = async (userPassword, reqPassword) =>{
    if (userPassword && reqPassword){
        console.log("hello")
        return await bcrypt.compare(reqPassword,userPassword);
    }else{
        return false;
    }
}