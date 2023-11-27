const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { name, password, email } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(password, salt)
  const tempUser = { name, email, password: hashedPwd }

  const token = jwt.sign({name, id: Date.now()}, process.env.JWT_SECRET, {expiresIn: '30d'})

  res.status(201).json({name, token})
}

const login = async (req, res) => {
  res.status(200).json({msg: 'login user'})
}

module.exports = {
  register, login
}