const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const MainRouter = require('./Router/MainRouter')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
//
//Public folder to acces files and resources
var dir = path.join(__dirname, 'Public')
app.use(express.static(dir))

//Connect to mongoose
mongoose.connect(process.env.API_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
	console.log('Mongo datebase connection started succescfully')
})

// MainRouter API Router
app.use('/', MainRouter)

const port = process.env.PORT || 4000

const server = app.listen(port, () => {
	console.log('Server listening on port ' + port)
})
