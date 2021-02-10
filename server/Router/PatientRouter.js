const express = require('express')
const PatientRouter = express.Router()
const PatientController = require('../Controller/PatientController')

PatientRouter.get('/', PatientController.getAll)

PatientRouter.get('/:cnp', PatientController.getCNP)

PatientRouter.get('/find/:name', PatientController.getNume)

PatientRouter.post('/add', PatientController.add)

PatientRouter.post('/update/:id', PatientController.updateUser)

PatientRouter.delete('/:id', PatientController.delete)

module.exports = PatientRouter
