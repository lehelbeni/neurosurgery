import { Grid, Typography } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { frequencyDistribution } from '../Methods/FrequencyDistribution'
import { SortObject } from '../Methods/SortObject'
import { HistopathologyStat } from './HistopathologyStat'

export const InterventionStats = ({ data }) => {
	const N = data.length

	return (
		<Grid container style={{ height: '700px', padding: '1rem' }}>
			<Grid item xs={5}>
				<HistopathologyStat data={data} />
			</Grid>
		</Grid>
	)
}
