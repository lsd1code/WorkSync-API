const Job = require('../models/Job')
const { NotFoundError } = require('../errors')

const getJobs = async (req, res) => {
  res.json({...req.user})
}

const getJob = async (req, res) => {
  res.send('get single jobs')
}

const createJob = async (req, res) => {
  res.send('add new job')
}

const updateJob = async (req, res) => {
  res.send('update job')
}

const deleteJob = async (req, res) => {
  res.send('delete job')
}

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}