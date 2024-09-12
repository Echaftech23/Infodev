require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes/web');
const app = express();
const router = require("./routes/web");

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

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.get('/articleTest', (req, res) => {
  res.render('single');
});
// routes
app.use('/',router);

// app.use('/users', require('./routes/users'));
// app.use('/articles', require('./routes/articles'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));