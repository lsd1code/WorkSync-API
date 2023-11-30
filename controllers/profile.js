const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findByIdAndUpdate(userId, {...req.body }, { new: true })
  console.log(user)

  return res.status(StatusCodes.OK).json({ success: true, msg: 'user profile updated succesfully' });
}

module.exports = { updateProfile };