const asynchandle = require('express-async-handler');
const jwt = require('jsonwebtoken');


const validateToken = asynchandle(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorized");
            }
            req.user = decoded.user;
            next();
        });
    }
    if(!token){
        res.status(401);
        throw new Error("user is not authorized");
    }

});
module.exports = validateToken;