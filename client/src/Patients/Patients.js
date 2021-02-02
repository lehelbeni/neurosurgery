import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useState, useEffect } from 'react'
import { DatebaseName } from '../Resources/Datebases'
import { GetAPI } from '../API/GetAPI'
import { PatientBox } from '../PatientBox/PatientBox'

export const Patients = () => {
	const [datebaseSelected, setDatebaseSelected] = useState('GLIAL TUMORS')
	const [patientList, setPatientList] = useState([])
	const [selectedDate, setSelectedDate] = useState({
		start: new Date(1990, 0, 1),
		end: new Date(),
	})
	const [prop, setProp] = useState('Date')
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		GetData()
	}, [])

	useEffect(() => {
		GetData()
		setRefresh(false)
	}, [refresh])

	function handleChange(e) {
		setDatebaseSelected(datebase => (datebase = e.target.value))
	}

	async function GetData() {
		const data = await GetAPI({ pathName: `/patient` })

		const res = orderList(data.data, prop)
		setPatientList(values => (values = res))
	}

	function handleSubmit(e) {
		e.preventDefault()
		GetData()
	}

	function orderList(array, prop) {
		function dynamicSort(property) {
			var sortOrder = 1
			if (property[0] === '-') {
				sortOrder = -1
				property = property.substr(1)
			}
			return function (a, b) {
				/* next line works with strings and numbers,
				 * and you may want to customize it to your needs
				 */
				if (prop == 'Date') {
					a[property] = new Date(a[property])
					b[property] = new Date(b[property])
				}

				var result =
					a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
				return result * sortOrder
			}
		}

		return array.sort(dynamicSort(prop))
	}

	return (
		<Grid container direction='row'>
			<Grid item xs={12}>
				<form onSubmit={handleSubmit}>
					<Grid container style={{ padding: '1rem' }} alignItems='center'>
						<Grid item xs={2}>
							<FormControl>
								<InputLabel id='datebase-select-label'>Datebase</InputLabel>
								<Select
									labelId='datebase-select-label'
									id='datebase-select'
									value={datebaseSelected}
									onChange={handleChange}
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
						<Grid item xs>
							<Button variant='contained' type='submit'>
								Search
							</Button>
						</Grid>
					</Grid>
				</form>
			</Grid>
			<Grid
				container
				direction='row'
				spacing={2}
				style={{ marginLeft: '1rem', marginRight: '1rem' }}
			>
				{patientList.map(el => {
					return <PatientBox patient={el} setRefresh={setRefresh} />
				})}
			</Grid>
		</Grid>
	)
}
