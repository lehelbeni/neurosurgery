import { Button, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DataDisplay } from '../../Subcomponents/DataDisplay'
import { DatebaseSelector } from '../../Subcomponents/DatebaseSelector'
import { DateSelection } from '../../Subcomponents/DateSelection'
import { GetData } from '../../API/GetInterventionList'
import { DataGrid } from '@material-ui/data-grid'

export const DataSelection = ({ setNewData }) => {
	const [datebaseSelected, setDatebaseSelected] = useState('GLIAL TUMORS')
	const [startDate, setStartDate] = useState(new Date(2000, 0, 1))
	const [endDate, setEndDate] = useState(new Date())
	const [data, setData] = useState([])
	const [selectedData, setSelectedData] = useState([])
	const header = [
		{ field: 'id', headerName: 'ID', width: 130 },
		{ field: 'Nume', headerName: 'Nume', width: 130 },
		{ field: 'Prenume', headerName: 'Prenume', width: 130 },
		{ field: 'CNP', headerName: 'CNP', width: 130 },
		{
			field: 'Date',
			headerName: 'Data Interventiei',
			width: 200,
			type: 'Date',
		},
		{ field: 'Histopathology', headerName: 'Histopathologie', width: 200 },
		{ field: 'Localisation', headerName: 'Localisation', width: 200 },
		{ field: '', headerName: '', width: 130 },
		{ field: '', headerName: '', width: 130 },
	]

	useEffect(() => {
		handleGetData()
	}, [])

	async function handleGetData() {
		const newData = await GetData({
			datebaseSelected: datebaseSelected,
			startDate: startDate,
			endDate: endDate,
			prop: 'Nume',
		})
		console.log(newData)
		setData(prev => {
			return newData
		})
		setNewData(prev => newData)
	}

	function handleSelectionChange(newSelection) {
		console.log(newSelection)
		setSelectedData(prev => (prev = newSelection))
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
				<DateSelection date={startDate} setDate={setStartDate} label='Start' />
			</Grid>

			<Grid item xs>
				<DateSelection date={endDate} setDate={setEndDate} label='End' />
			</Grid>

			<Grid item xs>
				<Button variant='contained' color='primary' onClick={handleGetData}>
					Submit
				</Button>
			</Grid>
			<Grid container style={{ height: '650px' }}>
				<Grid item xs>
					<DataGrid
						rows={data ? data : [{ id: 1 }]}
						columns={header}
						pageSize={10}
						checkboxSelection
						onSelectionChange={e => handleSelectionChange(e)}
					/>
				</Grid>
			</Grid>
			{/* <DataDisplay data={data} /> */}
		</Grid>
	)
}
