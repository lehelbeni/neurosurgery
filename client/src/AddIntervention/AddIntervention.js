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

export const AddIntervention = ({ Patient }) => {
	const [cnp, setCnp] = useState()
	const [interventionList, setInterventionList] = useState([])
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [newIntervention, setNewIntervention] = useState({
		db: Patient.db,
		CNP: Patient.CNP,
		Histopathology: 'Glioblastoma',
		Date: '',
		Localisation: 'FRONTAL',
	})

	useEffect(() => {
		setNewIntervention(values => ({ ...values, ['Date']: selectedDate }))
	}, [selectedDate])

	useEffect(() => {
		GetData()
	}, [])

	async function GetData() {
		const data = await GetAPI({ pathName: `/intervention/${Patient.CNP}` })
		console.log(data.data)
		setInterventionList(data.data)
	}

	const handleDateChange = date => {
		setSelectedDate(value => (value = date))
	}

	const handleChange = prop => event => {
		setNewIntervention(values => ({ ...values, [prop]: event.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		// await setNewIntervention(value => ({
		// 	...value,
		// 	['Date']: selectedDate,
		// }))
		console.log(newIntervention)
		await PostAPI({ pathName: `/intervention/add`, data: newIntervention })
		GetData()
	}

	function handleEdit(id) {}

	async function handleDelete(id) {
		await DeleteAPI({ pathName: `/intervention/${id}` })
		GetData()
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid container alignItems='center'>
					<Grid item xs>
						<TextField label='PatientCNP' value={Patient.CNP}></TextField>
					</Grid>
					<Grid item xs>
						<FormControl>
							<InputLabel id='histopathology-select-label'>
								Histopathology
							</InputLabel>
							<Select
								labelId='histopathology-select-label'
								id='histopathology-select'
								value={newIntervention.Histopathology}
								onChange={handleChange('Histopathology')}
							>
								{GlialTumors.map(loc => {
									return (
										<MenuItem value={loc} key={loc}>
											{loc}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs>
						<FormControl>
							<InputLabel id='localisation-select-label'>
								Localisation
							</InputLabel>
							<Select
								labelId='localisation-select-label'
								id='localisation-select'
								value={newIntervention.Localisation}
								onChange={handleChange('Localisation')}
							>
								{Localisation.map(loc => {
									return (
										<MenuItem value={loc} key={loc}>
											{loc}
										</MenuItem>
									)
								})}
							</Select>
						</FormControl>
					</Grid>

					<Grid item xs>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								disableToolbar
								variant='inline'
								format='MM/dd/yyyy'
								margin='normal'
								id='date-picker-inline'
								label='Data interventiei'
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs>
						<Button variant='contained' color='primary' type='submit'>
							ADD
						</Button>
					</Grid>
				</Grid>
			</form>

			<Grid container direction='row' spacing={2}>
				{interventionList.map(intervention => {
					return (
						<Grid item xs={12}>
							<Paper style={{ padding: '0.5rem' }}>
								<Grid container alignItems='center'>
									<Grid item xs>
										{intervention.Histopathology}
									</Grid>
									<Grid item xs>
										{intervention.Localisation}
									</Grid>
									<Grid item xs>
										{intervention.Date.toString().slice(0, 10)}
									</Grid>
									<Grid item xs>
										<Button
											variant='contained'
											onClick={handleEdit(intervention._id)}
										>
											EDIT
										</Button>
									</Grid>

									<Grid item xs>
										<Button
											variant='contained'
											onClick={() => handleDelete(intervention._id)}
										>
											Delete
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</>
	)
}
