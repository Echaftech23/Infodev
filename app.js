const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const router = require("./routes/web");
const multer = require('multer');
require('dotenv').config();

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));



const expressLayouts = require('express-ejs-layouts')

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public',)));


// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Method override middleware
app.use(methodOverride('_method'));
// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_fallback_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,  
    maxAge: 100 * 60 * 60 * 1000
   }
}));


// Set Templating Engine
app.use(expressLayouts)
app.set('layout', 'layouts/layout')

// Flash messages
app.use(flash());


// Pass flash messages to views
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

// routes
app.use('/',router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
