const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
  const authHeaders = req.headers.authorization

  if(!authHeaders || !authHeaders.startsWith('Bearer')) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  try {
    const [_, token] = authHeaders.split(' ')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      name: decoded.name,
      userId: decoded.userId
    }  
      
    next()
  } catch (error) {
    throw new UnauthenticatedError('Invalid token')
  }
}

module.exports = auth   