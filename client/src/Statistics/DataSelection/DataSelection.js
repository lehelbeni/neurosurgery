import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { DataDisplay } from '../../Subcomponents/DataDisplay'
import { DatebaseSelector } from '../../Subcomponents/DatebaseSelector'
import { DateSelection } from '../../Subcomponents/DateSelection'
import { GetData } from '../../API/GetInterventionList'

export const DataSelection = () => {
	const [datebaseSelected, setDatebaseSelected] = useState('GLIAL TUMORS')
	const [startDate, setStartDate] = useState()
	const [endDate, setEndDate] = useState()
	const [data, setData] = useState()

	function handleGetData() {
		const newData = GetData({
			datebaseSelected: datebaseSelected,
			startDate: startDate,
			endDate: endDate,
			prop: 'Nume',
		})
		setData(prev => (prev = newData))
	}

	return (
		<Grid container style={{ padding: '1rem' }}>
			<Grid item xs>
				<DatebaseSelector
					datebaseSelected={datebaseSelected}
					setDatebaseSelected={setDatebaseSelected}
				/>
			</Grid>

			<Grid item xs>
				<DateSelection setDate={setStartDate} label='Start' />
			</Grid>

			<Grid item xs>
				<DateSelection setDate={setEndDate} label='End' />
			</Grid>

			<Grid item xs>
				<Button variant='contained' color='primary' onClick={handleGetData}>
					Submit
				</Button>
			</Grid>
			<DataDisplay data={{}} />
		</Grid>
	)
}
