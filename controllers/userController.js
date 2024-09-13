const { date } = require('joi');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getLoginPage = async(req,res)=>{
    res.render("login");
}

const getSignPage = async(req,res) =>{
    res.render("signUp");
}

const createUser = async (req , res)=>{

    const user = await User.findOne({where : {email: req.body.email}});    
    
    if (user) {
        res.redirect("/sign")
        req.flash({"message":"Oops Email already exist"});
    }
    if(req.body.password == req.body.Confirm_password){
        req.body.password = await bcrypt.hash(req.body.password , 10);
        const {username , email , password } = req.body
        const token = bcrypt.genSalt(10);
        console.log(req.body);
        const newUser = await User.create({username , email , password , token});
        res.redirect("/login");
        res.send("");
    }else{
        res.body.message = "Please check your imformations";
        res.redirect("/sign")
    }
}


const check_user = async (req, res) => {
    try {
      console.log(req.body.email);
      const user = await User.findOne({ where: { email: req.body.email } });

      console.log(user);
      
      
      if (!user) {
        req.flash('error', 'User not found');
        return res.redirect('/login');
      }
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);

      if (!passwordMatch) {
        req.flash('error', 'Incorrect password');
        return res.redirect('/login');
      }
      //add user to session 
      req.session.user = user
      console.log("seesion = " + req.session.user);
      
      return res.redirect('/');
    } catch (error) {
      console.error('Error during login:', error);
      req.flash('error', 'Something went wrong. Please try again.');
      return res.redirect('/login');
    }
  };
  

const Logout = (req , res )=>{
    req.session.destroy();
    res.redirect("/login")
}

module.exports ={
    getLoginPage,
    getSignPage,
    createUser,
    check_user,
    Logout
}