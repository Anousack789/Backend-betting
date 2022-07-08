'use strict';
module.exports = (req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
  });
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};
