const mongoose = require('mongoose')

const interventionSchema = mongoose.Schema(
	{
		db: String,
		CNP: String,
		Histopathology: String,
		Localisation: String,
		Date: Date,
	},
	{
		timestamps: true,
	}
)

const Intervention = mongoose.model('intervention', interventionSchema)
module.exports = Intervention
