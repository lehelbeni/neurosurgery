const Intervention = require('../Model/InterventionModel')
const Patient = require('../Model/PatientModel')
const mongoose = require('mongoose')

exports.getAll = async (req, res) => {
	const allInterventions = await Intervention.find().exec()
	console.log(allInterventions)
	res.json(allInterventions)
}

exports.getByPatientCNP = async (req, res) => {
	//console.log(req)
	const InterventionList = await Intervention.find({
		CNP: req.params.id,
	}).exec()
	res.json(InterventionList)
}

exports.getByPatient = async (req, res) => {
	// console.log('here')
	// const agg = await Patient.aggregate([
	// 	{
	// 		$lookup: {
	// 			from: 'interventions',
	// 			localField: '_id',
	// 			foreignField: 'CNP',
	// 			as: 'patientsbyintervention',
	// 		},
	// 	},
	// ]).exec(function (err, patients) {
	// 	const p = patients.filter(el => el.patientsbyintervention.length > 0)
	// 	console.log(p)
	// 	res.json(p)
	// })

	const aggregate = await Intervention.aggregate([
		{
			$lookup: {
				from: 'patients',
				localField: 'CNP',
				foreignField: '_id',
				as: 'patientsbyintervention',
			},
		},
	]).exec(function (err, patients) {
		const agg = patients.filter(el => el.patientsbyintervention[0] != undefined)

		const response = agg.map(el => {
			const re = {
				...el,
				Nume: el.patientsbyintervention[0].Nume,
				Prenume: el.patientsbyintervention[0].Prenume,
				DatadeNastere: el.patientsbyintervention[0].DataDeNastere,
				Sex: el.patientsbyintervention[0].Sex,
				db: el.patientsbyintervention[0].db,
			}
			delete re['patientsbyintervention']
			return re
		})

		res.json(response)
	})
}

exports.add = async (req, res) => {
	console.log('AddingIntervention')
	const newIntervention = new Intervention(req.body)
	newIntervention
		.save()
		.then(() => res.json('Intervention added!'))
		.catch(err => res.status(400).json('Error: ' + err))
}

//Update user
exports.update = async (req, res) => {
	if (req.body['_id']) delete req.body['_id']
	Intervention.findByIdAndUpdate(req.params.id, req.body)
		.exec()
		.then(() => res.json('Updated succesfully'))
		.catch(err => res.status(400).json('Error' + err))
}

exports.delete = async (req, res) => {
	const param = req.params.id
	Intervention.findByIdAndDelete(param)
		.exec()
		.then(() => res.json('Deleted!'))
		.catch(err => res.status(400).json('Error: ' + err))
}
