require('express-async-errors')
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500

// connect db
const connectDB = require('./db/connect')

// routes
const authRouter = require('./routes/auth')

// middleware
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// body-parser
app.use(express.json())

app.get('/', (req, res) => {
  res.send('homepage')
})

app.use('/api/v1/auth', authRouter)

app.use(errorHandler)
app.use(notFound)

const start = (async () => {
  try {
    app.listen(PORT, console.log(`http://localhost:${PORT}`))
  } catch (error) {
    console.log(error);
  }
})
start()
