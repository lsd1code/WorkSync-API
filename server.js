require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

const { join } = require('path');
const cors = require('cors');

const connectDB = require('./db/connect');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const profileRouter = require('./routes/profile');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const authMiddleware = require('./middleware/authorize');

app.use(cors());

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobsRouter);
app.use('/api/v1/profile', authMiddleware, profileRouter);

app.use(errorHandler);
app.use(notFound);

const start = (async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`http://localhost:${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();