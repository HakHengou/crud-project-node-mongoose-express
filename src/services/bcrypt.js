const bcrypt = require('bcrypt');

exports.hashPassword = async password =>{
    return bcrypt.hash(password, 10);
}
exports.comparePassword = async ( reqPassword, userPassword) =>{
    if (reqPassword && userPassword ){
        return await bcrypt.compare(reqPassword,userPassword);
    }else{
        return false;
    }
}