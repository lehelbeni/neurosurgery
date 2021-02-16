import { Grid, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { frequencyDistribution } from '../Methods/FrequencyDistribution'
import { SortObject } from '../Methods/SortObject'

export const HistopathologyStat = ({ data }) => {
	const freq = frequencyDistribution(data, 'Histopathology')
	const sorted = SortObject(freq)
	const tableData = []
	const head = [
		{ field: 'name', headerName: 'Histopathology', width: 300 },
		{ field: 'value', headerName: 'Number', width: 130 },
		{ field: 'percent', headerName: 'Percent', width: 130, type: 'percent' },
	]
	sorted.map((el, key) => {
		tableData.push({
			name: el[0],
			value: el[1],
			percent: ((el[1] * 100) / N).toFixed(2),
			id: key,
		})
	})

	console.log(tableData)
	console.log(head)

	return (
		<Grid container style={{ height: '700px', padding: '1rem' }}>
			<Grid item xs={5}>
				<DataGrid columns={head} rows={tableData} pageSize={10} />
			</Grid>
		</Grid>
	)
}
