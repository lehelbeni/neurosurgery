const express = require('express')
const MainRouter = express.Router()
const PatientRouter = require('./PatientRouter')
const InterventionRouter = require('./InterventionRouter')

MainRouter.use('/patient', PatientRouter)

MainRouter.use('/intervention', InterventionRouter)

module.exports = MainRouter
