require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes/web');
const app = express();
const router = require("./routes/web");
const isAuth = require("./middlewares/isAuth")

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(isAuth)

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Flash messages
app.use(flash());

// routes
app.use('/',router);
// app.use('/login', UserRouter);
// app.use('/users', require('./routes/users'));
// app.use('/articles', require('./routes/articles'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));