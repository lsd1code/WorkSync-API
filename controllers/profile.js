const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const updateProfile = (req, res) => {
  const { userId, name } = req.user

  res.status(StatusCodes.OK).json({ success: true, msg: 'update user profile' })
}

module.exports = { updateProfile }