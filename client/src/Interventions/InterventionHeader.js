import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'

export const InterventionHeader = () => {
	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '0.5rem' }}>
				<Grid container alignItems='center'>
					<Grid item xs>
						<Typography>Nume</Typography>
					</Grid>
					<Grid item xs>
						<Typography>Prenume</Typography>
					</Grid>
					<Grid item xs>
						<Typography>CNP</Typography>
					</Grid>
					<Grid item xs>
						<Typography>Sex</Typography>
					</Grid>

					<Grid item xs>
						<Typography>Histopathology</Typography>
					</Grid>
					<Grid item xs>
						<Typography>Localizare</Typography>
					</Grid>
					<Grid item xs>
						<Typography>Data</Typography>
					</Grid>
					<Grid item xs></Grid>

					<Grid item xs></Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}
