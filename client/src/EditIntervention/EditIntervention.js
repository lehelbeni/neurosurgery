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

export const EditIntervention = ({
	intervention,
	setRefresh,
	setDone,
	setInt,
}) => {
	const [selectedDate, setSelectedDate] = useState(intervention.Date)
	const [newIntervention, setNewIntervention] = useState({
		_id: intervention._id,
		db: intervention.db,
		CNP: intervention.CNP,
		Histopathology: intervention.Histopathology,
		Date: new Date(intervention.Date),
		Localisation: intervention.Localisation,
	})

	useEffect(() => {
		setNewIntervention(values => ({ ...values, ['Date']: selectedDate }))
	}, [selectedDate])

	const handleDateChange = date => {
		setSelectedDate(value => (value = date))
	}

	const handleChange = prop => event => {
		setNewIntervention(values => ({ ...values, [prop]: event.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		console.log('new', newIntervention)
		setInt(prev => newIntervention)
		const res = PostAPI({
			pathName: `/intervention/update/${newIntervention._id}`,
			data: newIntervention,
		})
		console.log(res)
		setRefresh(true)
		setDone(false)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid container alignItems='center'>
					<Grid item xs>
						<TextField
							label='PatientCNP'
							value={newIntervention.CNP}
						></TextField>
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
		</>
	)
}
