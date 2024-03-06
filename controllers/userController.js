const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passswordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword!',
        400,
      ),
    );
  }
  //Update user document
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(400).json({
    status: 'fail',
    message: 'This route is not defined! Please use /signup instead.',
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
