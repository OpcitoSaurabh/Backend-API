// Note: because express-async-handler lib. you dont need to write try catch for error handling
// imports 
// importing async handler from express-async-handler lib. 
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModule")
// setting all routes here

// @desc Post all users
// @route Post api/users
// @access public

const registerUser=asyncHandler(async(req,resp)=>{
    const {userName,email,password}=req.body;
    // checking for required fields
    if(!userName||!email||!password){
        resp.status(400);
        throw new Error("All Fields are Mendetory!")
    }

    // checking if email is alredy exist or not
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        resp.status(400);
        throw new Error("User with this email already exist")
    }
    // convert row password into hash password with the help of bcrypt lib. where 10 is number of rounds we can change that number
    const hashPassword = await bcrypt.hash(password,10);
    
    const user = await User.create({
        userName,
        email,
        password:hashPassword
    })
    if(user){
        resp.status(201).json({id:user.id, name:user.userName, email:user.email, message:"User Created Successfully"})
    }else{
        resp.status(400)
        throw new Error("User data is not valid")
    }
})

// @desc Post loginUser
// @route Post api/users
// @access public
const loginUser=asyncHandler(async(req,resp)=>{
   const {email,password}=req.body;
    // checking for required fields
    if(!email||!password){
        resp.status(400);
        throw new Error("All Fields are Mendetory!")
    }
    // checking if user is register then will comapire password with hashPassword
    const user = await User.findOne({email});
    if(user && bcrypt.compare(password,user.password) ){
        // create a accessToken for user where user object pass info or payload which we want or need in token
        // process.env.ACCESS_TOKEN_SECERT is used for embeded information
        // expiresIn is use for setting expire token time
        const accessToken = await jwt.sign({
            user:{
                userName:user.userName,
                email:user.email,
                id:user.id,
            }
        },process.env.ACCESS_TOKEN_SECERT, {
            expiresIn:"15m"
        })
       resp.status(200).json({accessToken})
    }
    else{
        resp.status(400)
        throw new Error("Email or Password is not Valid")
    }
})
// @desc Get user info
// @route Put api/users
// @access private
const currentUser=asyncHandler(async(req,resp)=>{
    resp.json(req.user)
})


module.exports={currentUser, loginUser, registerUser}