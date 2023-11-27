const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthorized')

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError
}