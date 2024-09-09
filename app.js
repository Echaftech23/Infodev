require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_fallback_secret',
  resave: false,
  saveUninitialized: true
}));

// Flash messages
app.use(flash());

app.get('/', (req, res) => {
  res.render('login');
});

// Routes (to be added later)
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/articles', require('./routes/articles'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));