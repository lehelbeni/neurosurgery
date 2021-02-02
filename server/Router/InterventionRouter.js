const express = require('express')
const InterventionRouter = express.Router()
const InterventionController = require('../Controller/InterventionController')

InterventionRouter.get('/', InterventionController.getAll)

InterventionRouter.get('/cnp/:id', InterventionController.getByPatientCNP)

InterventionRouter.get('/bypat', InterventionController.getByPatient)

InterventionRouter.post('/add', InterventionController.add)

InterventionRouter.post('/update/:id', InterventionController.update)

InterventionRouter.delete('/:id', InterventionController.delete)

module.exports = InterventionRouter
