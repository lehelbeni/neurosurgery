const Patient = require('../Model/PatientModel')

//Get all Patient
exports.getAll = async (req, res) => {
	const allPatient = await Patient.find()
		.sort([['Nume']])
		.exec()
	res.json(allPatient)
}

//Get one PatientUser
exports.getNume = async (req, res) => {
	const nume = req.params.name.split('.')[0]
	const prenume = req.params.name.split('.')[1]
	console.log(nume, prenume)
	const response = await Patient.find({
		$or: [{ Nume: nume }],
	}).exec()
	res.json(response)
}

exports.getCNP = async (req, res) => {
	const response = await Patient.find({
		CNP: req.params.cnp,
	}).exec()
	res.json(response)
}

exports.add = async (req, res) => {
	console.log('AddingUser')
	const newPatientUser = new Patient(req.body)
	newPatientUser
		.save()
		.then(() => res.json('User added!'))
		.catch(err => res.status(400).json('Error: ' + err))
}

//Update user
exports.updateUser = async (req, res) => {
	console.log(req.body)
	PatientUser.findOneAndUpdate({ CNP: req.params.cnp }, req.body)
		.exec()
		.then(() => res.json('Updated succesfully'))
		.catch(err => res.status(400).json('Error' + err))
}

exports.delete = async (req, res) => {
	const param = req.params.cnp
	Patient.findByIdAndDelete(param)
		.exec()
		.then(() => res.json('Deleted!'))
		.catch(err => res.status(400).json('Error: ' + err))
}
