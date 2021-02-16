const mongoose = require('mongoose')

const patientSchema = mongoose.Schema(
	{
		db: String,
		Nume: String,
		Prenume: String,
		Type: String,
		CNP: String,
		DataDeNastere: Date,
		Sex: String,
		Varsta: String,
		Diagnostic: String,
	},
	{
		timestamps: true,
	}
)

const Patient = mongoose.model('patient', patientSchema)
module.exports = Patient
