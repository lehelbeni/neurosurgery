const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
	{
		_id: String,
		db: String,
		Nume: String,
		Prenume: String,
		Type: String,
		CNP: String,
		DataDeNastere: Date,
		Sex: String,
		Varsta: String,
	},
	{
		timestamps: true,
	}
)

const Patient = mongoose.model('patient', patientSchema)
module.exports = Patient
