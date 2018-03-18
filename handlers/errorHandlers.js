
exports.catchErrors = (fn) => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
  };
  
  /*
    Not Found Error Handler
  
    If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
  */
  exports.notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  };
  
  /*
    MongoDB Validation Error Handler
  
    Detect if there are mongodb validation errors that we can nicely show via flash messages
  */
  
  exports.flashValidationErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    // validation errors look like
    const errorKeys = Object.keys(err.errors);
    errorKeys.forEach(key => req.flash('error', err.errors[key].message));
    res.redirect('back');
  };