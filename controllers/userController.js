const { User } = require('../models');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const getLoginPage = async(req,res)=>{
    res.render("login");
}

const getSignPage = async(req,res) =>{
    res.render("signUp");
}

const createUser = async (req , res)=>{

    console.log(req.body.username);
    if(req.body.password == req.body.Confirm_password){
        req.body.password = await bcrypt.hash(req.body.password , 10);
        const {username , email , password} = req.body
        console.log(req.body);
        const newUser = await User.create({username , email , password});
        res.redirect("/")
    }else{
        // res.body.message = "Please check your imformations";
        res.redirect("/sign")
    }
}

module.exports ={
    getLoginPage,
    getSignPage,
    createUser
}