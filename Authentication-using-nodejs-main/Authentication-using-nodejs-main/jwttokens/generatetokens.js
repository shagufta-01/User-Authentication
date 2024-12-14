const jwt = require('jsonwebtoken');
const secret= "this is secret key"

function setuser(user){

    const payload = {
        username : user.username,
    }

    return jwt.sign(payload,secret)
    }

function getuser(token){
    if(!token) return null

    return jwt.verify(token)
}


module.exports={
    getuser,
    setuser
}