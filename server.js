const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const app = require('./app');
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection succesfully!');
});

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}...`);
});
