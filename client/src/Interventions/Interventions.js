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
import { PatientsInterventionBox } from '../PatientInterventionBox/PatientsInterventionBox'
import Pagination from '@material-ui/lab/Pagination'
import { InterventionHeader } from './InterventionHeader'

export const Interventions = () => {
	const [datebaseSelected, setDatebaseSelected] = useState('GLIAL TUMORS')
	const [interventionList, setInterventionList] = useState([])
	const [selectedDate, setSelectedDate] = useState({
		start: new Date(1990, 0, 1),
		end: new Date(),
	})
	const [prop, setProp] = useState('Date')
	const [refresh, setRefresh] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [elementsPerPage, setElementsPerPage] = useState(20)

	useEffect(() => {
		GetData()
	}, [])

	useEffect(() => {
		GetData()
		setRefresh(false)
	}, [refresh])

	const handleDateChange = prop => date => {
		setSelectedDate(value => ({ ...value, [prop]: date }))
	}

	function handleChange(e) {
		setDatebaseSelected(datebase => (datebase = e.target.value))
	}

	function handlePageChange(event, value) {
		setCurrentPage(prev => (prev = value))
	}

	async function GetData() {
		const data = await GetAPI({ pathName: `/intervention/bypat` })
		const filtered = data.data.filter(el => {
			el.Date = new Date(el.Date)
			if (
				el.db == datebaseSelected &&
				+el.Date.getTime() >= +selectedDate.start.getTime() &&
				+el.Date.getTime() <= +selectedDate.end.getTime()
			)
				return el
		})
		const res = orderList(filtered, prop)

		setInterventionList(values => (values = res))
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
						<Grid item xs={2}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='start-date-picker-inline'
									label='Start Period'
									value={selectedDate.start}
									onChange={handleDateChange('start')}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={2}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant='inline'
									format='MM/dd/yyyy'
									margin='normal'
									id='end-date-picker-inline'
									label='End period'
									value={selectedDate.end}
									onChange={handleDateChange('end')}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
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
				<InterventionHeader />
				{interventionList.map((el, index) => {
					if (
						index > (currentPage - 1) * elementsPerPage &&
						index <= currentPage * elementsPerPage
					)
						return (
							<PatientsInterventionBox
								intervention={el}
								setRefresh={setRefresh}
							/>
						)
				})}
			</Grid>
			<Grid container justify='center'>
				<Grid item justify='center'>
					<Pagination
						count={Math.ceil(interventionList.length / elementsPerPage)}
						page={currentPage}
						color='primary'
						onChange={handlePageChange}
						style={{ margin: '2rem' }}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}
