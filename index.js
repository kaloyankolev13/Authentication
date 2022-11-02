const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

mongoose
  .connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongo Connection Open!');
  })
  .catch((err) => {
    console.log('Mongo Connection Error!');
    console.log(err);
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));

app.get('/', (req, res) => {
  res.send('This is the home page!');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  //   console.log(hash);
  const user = new User({ username, password: hash });
  await user.save();
  req.session.user_id = foundUser._id;
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (validPassword) {
    req.session.user_id = foundUser._id;
    res.redirect('/secret');
  } else {
    res.redirect('/login');
  }
});

app.post('/logout', (req, res) => {
  // req.session.user_id = null;
  req.session.destroy();
  res.redirect('/login');
});

app.get('/secret', async (req, res) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  }
  res.render('secret');
});

app.listen(3000, () => {
  console.log('Server started');
});
