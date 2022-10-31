const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hash);
  return hash;
};

// console.log(ashPassword('monkey'));

const login = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  if (result) {
    console.log('Logged in!');
  } else {
    console.log('Incorrect password');
  }
};

hashPassword('monkey');

login('monkey', '$2b$12$FIFgeC/NVn8efP8L/7JLCe4P0vPx5fFgi0nlU46iSFHnQ3w1Zd9bO');
