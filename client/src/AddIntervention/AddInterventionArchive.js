import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { Localisation } from '../Resources/Localisations'
import DateFnsUtils from '@date-io/date-fns'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import { Button } from '@material-ui/core'
import { PostAPI } from '../API/PostAPI'
import { AllInterventions } from '../AllInterventions/AllInterventions'
import { GetAPI } from '../API/GetAPI'
import { DeleteAPI } from '../API/DeleteAPI'
export const AddIntervention = ({ Patient }) => {
	console.log(Patient)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [int, setInt] = useState([])
	const [newIntervention, setIntervention] = useState({
		CNP: '',
		Diagnostic: '',
		Localizare: 'FRONTAL',
		Data: '',
	})

	// useEffect(() => {
	// 	async function GetData() {
	// 		const data = await GetAPI({ pathName: `/intervention/${Patient.CNP}` })
	// 		console.log(data.data)
	// 		setInt(data.data)
	// 	}
	// 	GetData()
	// }, [newIntervention])

	const handleDateChange = date => {
		setSelectedDate(date)
	}

	const handleChange = prop => event => {
		setIntervention(values => ({ ...values, [prop]: event.target.value }))
	}

	async function handleSubmit(e) {
		e.preventDefault()
		console.log(Patient.CNP, selectedDate)
		await setIntervention(intervention => ({
			...intervention,
			['CNP']: Patient.CNP,
			['Data']: selectedDate,
		}))
		setInt(int => [...int, newIntervention])
		console.log(newIntervention)
		PostAPI({ pathName: `/intervention/add`, data: newIntervention }).then()
	}

	function handleDelete(id) {
		DeleteAPI({ pathName: `/intervention/${id}` })
		setInt(el => el.filter(el => el._id != id))
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid container alignItems='flex-end' spacing={4}>
					<Grid item xs={3}>
						<TextField
							label='Diagnostic'
							value={newIntervention.Diagnostic}
							onChange={handleChange('Diagnostic')}
						/>
					</Grid>
					<Grid item xs={3}>
						<FormControl>
							<InputLabel id='localisation-select-label'>
								Localisation
							</InputLabel>
							<Select
								labelId='localisation-select-label'
								id='localisation-select'
								value={newIntervention.Localizare}
								onChange={handleChange('localisation')}
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
					<Grid item xs={3}>
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
					<Grid item xs={3}>
						<Button variant='contained' color='primary' type='submit'>
							ADD INTERVENTION
						</Button>
					</Grid>
				</Grid>
			</form>
			{/* <AllInterventions intervention={int} /> */}
			{int.map(int => {
				return (
					<Paper
						style={{
							marginTop: '10px',
							paddingTop: '3px',
							paddingBottom: '3px',
						}}
					>
						<Grid container alignItems='center'>
							<Grid item xs>
								{int.Diagnostic}
							</Grid>
							<Grid item xs>
								{int.Localizare}
							</Grid>
							<Grid item xs>
								{int.Data}
							</Grid>
							<Grid item xs>
								<Button
									variant='contained'
									color='secondary'
									onClick={() => handleDelete(int._id)}
								>
									delete
								</Button>
							</Grid>
						</Grid>
					</Paper>
				)
			})}
		</>
	)
}
