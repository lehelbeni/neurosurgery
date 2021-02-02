import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { DatebaseName } from '../Resources/Datebases'
import { PostAPI } from '../API/PostAPI'

export var PatientData = {}

export const AddPatient = () => {
	const [Patient, setPatient] = useState({
		_id: '',
		db: 'GLIAL TUMORS',
		Nume: '',
		Prenume: '',
		CNP: '',
		DataDeNastere: '',
		Sex: '',
		Varsta: '',
	})
	const [response, setResponse] = useState()

	const handleChange = prop => event => {
		setPatient(values => ({ ...values, [prop]: event.target.value }))
	}

	function handleSubmit(e) {
		e.preventDefault()
		const sexInd = Patient.CNP.slice(0, 1)
		const year = Patient.CNP.slice(1, 3)
		const month = parseInt(Patient.CNP.slice(3, 5))
		const date = Patient.CNP.slice(5, 7)
		Patient.Sex = sexInd % 2 == 1 ? 'Masculin' : 'Feminin'
		Patient.DataDeNastere = new Date(year, month - 1, date)
		Patient._id = Patient.CNP
		const today = new Date()
		const ddate = Math.floor(
			(today.getTime() - Patient.DataDeNastere.getTime()) /
				(1000 * 3600 * 24 * 365.25)
		)
		Patient.Varsta = ddate

		PostAPI({ pathName: '/patient/add', data: Patient })
			.then(res => {
				{
					PatientData = Patient
				}
				setResponse(
					<>
						<Typography>Nume: {Patient.Nume}</Typography>
						<Typography>Prenume: {Patient.Prenume}</Typography>
						<Typography>CNP: {Patient.CNP}</Typography>
						<Typography>
							Data de nastere: {Patient.DataDeNastere.toJSON().slice(0, 10)}
						</Typography>
						<Typography>Sex: {Patient.Sex}</Typography>
					</>
				)
			})
			.catch(err => {
				setResponse(
					<>
						<Typography>{JSON.stringify(err.message)}</Typography>
					</>
				)
			})
	}

	return (
		<>
			<form className='input-form' onSubmit={handleSubmit}>
				<Grid container spacing={2} alignItems='flex-end'>
					<Grid item xs={2}>
						<FormControl>
							<InputLabel id='datebase-select-label'>Datebase</InputLabel>
							<Select
								labelId='datebase-select-label'
								id='datebase-select'
								value={Patient.db}
								onChange={handleChange('db')}
							>
								{DatebaseName.map(db => {
									return (
										<MenuItem value={db} key={db}>
											{db}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={2}>
						<TextField
							label='Nume'
							value={Patient.Nume}
							onChange={handleChange('Nume')}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							label='Prenume'
							value={Patient.Prenume}
							onChange={handleChange('Prenume')}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							label='CNP'
							value={Patient.CNP}
							onChange={handleChange('CNP')}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button variant='contained' color='primary' type='submit'>
							ADAUGA PACIENT
						</Button>
					</Grid>
				</Grid>
			</form>
			<div>{response}</div>
		</>
	)
}
