import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { Localisation } from '../Resources/Localisations'
import { GlialTumors } from '../Resources/GlialTumors'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { PostAPI } from '../API/PostAPI'
import { GetAPI } from '../API/GetAPI'
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper'
import { DeleteAPI } from '../API/DeleteAPI'
import { DatebaseName } from '../Resources/Datebases'

export const EditPatient = ({ Patient, setRefresh, setDone, setInt }) => {
	const [newPatient, setNewPatient] = useState(Patient)
	// 	{
	// 	_id: Patient._id,
	// 	db: Patient.db,
	// 	CNP: Patient.CNP,
	// 	Nume: Patient.Nume,
	// 	Prenume: Patient.Prenume,
	// 	Sex: Patient.Sex,
	// 	DataDeNastere: Patient.DataDeNastere,
	// })

	const handleChange = prop => event => {
		setNewPatient(values => ({ ...values, [prop]: event.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		console.log('new', newPatient)
		setInt(prev => newPatient)
		const res = PostAPI({
			pathName: `/Patient/update/${newPatient._id}`,
			data: newPatient,
		})
		console.log(res)
		setDone(false)
		setInt(newPatient)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid container alignItems='center'>
					<Grid item xs={2}>
						<FormControl>
							<InputLabel id='datebase-select-label'>Datebase</InputLabel>
							<Select
								labelId='datebase-select-label'
								id='datebase-select'
								value={newPatient.db}
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
							value={newPatient.Nume}
							onChange={handleChange('Nume')}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							label='Prenume'
							value={newPatient.Prenume}
							onChange={handleChange('Prenume')}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							label='CNP'
							value={newPatient.CNP}
							onChange={handleChange('CNP')}
						/>
					</Grid>

					<Grid item xs>
						<Button variant='contained' color='primary' type='submit'>
							ADD
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	)
}
