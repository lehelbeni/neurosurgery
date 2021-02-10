import { Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
export const PatientStats = ({ data }) => {
	const [patients, setPatients] = useState()
	console.log('asd', data)
	const N = data.length
	const maleN = data.filter(el => el.Sex == 'Masculin').length
	const femaleN = data.filter(el => el.Sex == 'Feminin').length
	const malePercent = (maleN * 100) / N
	const femalePercent = (femaleN * 100) / N

	const all = femalePercent + malePercent

	const state = {
		labels: ['Masculin', 'Feminin'],
		datasets: [
			{
				label: 'Gender',
				backgroundColor: ['#C9DE00', '#B21F00'],
				hoverBackgroundColor: ['#4B5000', '#501800'],
				data: [maleN, femaleN],
			},
		],
	}

	return (
		<Grid container>
			<Grid item xs>
				<Doughnut data={state} height={50} />
			</Grid>
			<Grid item xs>
				<Typography>
					Masculin {maleN} n / {malePercent.toFixed(3)}%
				</Typography>
				<Typography>
					Feminin {femaleN} n / {femalePercent.toFixed(3)}%
				</Typography>
				<Typography>
					Total {maleN + femaleN} n / {all}%
				</Typography>
			</Grid>
		</Grid>
	)
}
