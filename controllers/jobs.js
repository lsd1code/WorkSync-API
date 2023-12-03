const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getJobs = async (req, res) => {
  const { userId } = req.user
  const jobs = await Job.find({ createdBy: userId })
  
  res.json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  const job = await Job.findOne({ createdBy: userId, _id: id })

  if(!job) {
    throw new NotFoundError(`Job ${id} not found`)
  }

  res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
  const { userId } = req.user
  const job = await Job.create({ ...req.body, createdBy: userId })

  res.status(StatusCodes.CREATED).json({ success: true, msg: `${job._id} created succesfully` })
}

const updateJob = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  const job = await Job.findOneAndUpdate(
    { createdBy: userId, _id: id },
    { ...req.body },
    { new: true }
  )

  if(!job) {
    throw new NotFoundError(`Job ${id} not found`)
  }

  res.status(StatusCodes.OK).json({success: true, msg: `Job ${id} updated succesfully`})
}

const deleteJob = async (req, res) => {
  const { userId } = req.user
  const { id } = req.params
  const job = await Job.findOneAndDelete({ createdBy: userId, _id: id })

  if(!job) {
    throw new NotFoundError(`Job ${id} not found`)
  }

  res.status(StatusCodes.OK).json({success: true, msg: `Job ${id} deleted succesfully`})
}

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}