const { date } = require('joi');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

const getLoginPage = async (req, res) => {
    res.render("login");
}

const getSignPage = async (req, res) => {
    res.render("signUp");
}

const createUser = async (req, res) => {

    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
        res.redirect("/sign")
        req.flash({ "message": "Oops Email already exist" });
    }
    if (req.body.password == req.body.Confirm_password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const { username, email, password } = req.body

        const newUser = await User.create({ username, email, password, token });
        res.redirect("/login");
        res.send("");
    } else {
        res.body.message = "Please check your imformations";
        res.redirect("/sign")
    }
}


const check_user = async (req, res) => {
    try {
        console.log(req.body.email);
        const user = await User.findOne({ where: { email: req.body.email } });

        // console.log(user);


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
        // res.cookie('user', JSON.stringify(user));
        console.log("seesion = " + req.session.user);

        return res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/login');
    }
};


const Logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login")
}

const F_EnterEmail = (req, res) => {
    res.render("SendEmail");
}

const Forget_email = async (req, res) => {
    const email = req.body
    console.log(email);

    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const result = await schema.validate({ email });

    if (result.error) {
        return res.status(400).send({ error: result.error.message });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.send("User unfound");
    }

    const token = bcrypt.genSalt(10);
    console.log(req.body);
    user.token = token
    await user.save();
    console.log(user);
    if (await send(email, resetToken)) {
        return res.status(200).json({ message: 'Reset password link sent to email' });
    } else {
        return res.status(500).json({ message: 'An error occurred during password reset' });
    }
}

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function send(targetEmail, resetToken) {
    try {
        const info = await transporter.sendMail({
            from: 'Blog Platform',
            to: targetEmail,
            subject: "Reset your password",
            html: await ejs.renderFile(
                path.join(__dirname, '../views/', 'Emailbody.ejs')
                ,
                { resetLink: 'http://localhost:3000/reset-password/verify?token=' + resetToken }
            ),
        });
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    getLoginPage,
    getSignPage,
    createUser,
    check_user,
    Logout,
    F_EnterEmail,
    Forget_email,
    Logout,
}