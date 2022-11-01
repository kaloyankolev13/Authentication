const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');

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
  res.redirect('/');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  // console.log(req.body);

  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (validPassword) {
    res.send('Welcome back!');
  } else {
    res.send('Invalid password!');
  }
});

app.get('/secret', async (req, res) => {
  res.send('This is a secret');
});

app.listen(3000, () => {
  console.log('Server started');
});
