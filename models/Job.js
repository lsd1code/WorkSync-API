const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      minlength: 5,
      required: [true, 'Job position must be provided'],
      trim: true
    },
    company: {
      type: String,
      minlength: 5,
      required: [true, 'Company name must be provided'],
      trim: true
    },
    location: {
      type: String,
      minlength: 5,
      required: [true, 'Company location must be provided'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'declined', 'interview'],
        message: '{VALUE} is not supported'
      },
      default: 'pending'
    },
    job_type: {
      type: String,
      enum: {
        values: ['full-time', 'part-time', 'remote', 'internship'],
        message: '{VALUE} is not supported'
      },
      default: 'full-time'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Job', JobSchema)