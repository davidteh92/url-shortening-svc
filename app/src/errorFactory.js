const createError = require('http-errors');


function ErrorFactory(errorCode, errorObject) {
  let error = {
    status: errorCode,
    code: errorObject.name,
    message: errorObject.message,
    developerMessage: ''
  };
  error = Object.assign(error, errorObject);

  switch (error.status) {
    case 400: return createError.BadRequest(error);
    case 403: return createError.Forbidden(error);
    case 404: return createError.NotFound(error);
    case 409: return createError.Conflict(error);

    default: return createError.InternalServerError(error);
  }
}


module.exports = {
  ErrorFactory
};
