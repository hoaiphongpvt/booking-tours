const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({
  path: './config.env',
});

const app = require('./app');
const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection succesfully!');
});

const server = app.listen(PORT, () => {
  console.log(`App running at port ${PORT}...`);
});

process.on('unhandledRejection', (err) => {
  server.close(() => {
    process.exit(1);
  });
});

process.on('SYGTERM', () => {
  console.log('SYGTERM RECIEVED, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
