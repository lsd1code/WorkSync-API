const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must be provided'],
    minlength: 4,
    maxlength: 50,
    trim: true
  },
  lastname: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 
      'Enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    minlength: 4,
  }
})

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.genJWT = function() {
  const token = jwt.sign(
    { name: this.name, userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIMELINE }
  )
  return token
}

UserSchema.methods.compareVerifyPassword = function(password) {
  const isMatch = bcrypt.compare(password, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)