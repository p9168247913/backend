const jwt = require("jsonwebtoken")
require("dotenv").config()

const AuthMiddleware = (req,res,next) => {
    let token = req.headers.authorization;
    if(token){
        const decode = jwt.verify(token, process.env.key)
        if(decode){
            const userId = decode.userId;
            req.body.userId = userId
            next()
        }else{
            console.log("Token Error")
            res.send("Decode Error")
        }
    }else{
        console.log("Error in MiddleWare")
        res.send("Please Login First")
    }
}
module.exports=AuthMiddleware
