const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandle = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');

const app = express();
//Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandle);

module.exports = app;
