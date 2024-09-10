const { User } = require('../models');

const getLoginPage = async(req,res)=>{
    res.render("login");
}

const getSignPage = async(req,res) =>{
    res.render("signUp");
}

const createUser = async (req , res)=>{
    console.log(req.body.username);
    const {username , email , password} = req.body
    console.log(req.body);
    const newUser = await User.create({username , email , password});
    // res.status(201).json(newUser);
}

module.exports ={
    getLoginPage,
    getSignPage,
    createUser
}