const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({...req.body})
  const token = user.genJWT()

  return res.status(StatusCodes.CREATED).json({ name: user.name, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) {
    throw new BadRequestError('Email and Password must be provided')
  }

  const user = await User.findOne({ email })

  if(!user) {
    throw new BadRequestError('Invalid credentials')
  }

  const match = await user.compareVerifyPassword(password)

  if(!match) {
    throw new BadRequestError('Enter a valid password')
  }

  const token = user.genJWT()

  res.status(StatusCodes.OK).json({name: user.name, token})
}

module.exports = {
  register, login
}