const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Post user
//@route POST /api/user/register
//@access public
const createUser = asyncHandler(async (req, res)=>{
    const {username, email, password}= req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Filed are Mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword)

    const user = await User.create({
        username,
        email,
        password:hashedpassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201);
        res.json({_id:user.id, email:user.email});
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
});

//@desc Post login
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
           { 
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1d"}
        );
        res.status(200).json({accessToken}); 
    }else{
        res.status(401);
        throw new Error("Emai or Password not valid");
    }
});

//@desc Get currentUser
//@route POST /api/user/current
//@access public
const currentUser = asyncHandler(async (req, res)=>{

    res.json({message:"Current the user"})
});

module.exports = {createUser, loginUser, currentUser};
  