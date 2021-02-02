import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DeleteAPI } from '../API/DeleteAPI'
import { PostAPI } from '../API/PostAPI'

export const InterventionBox = ({ intervention }) => {
	function handleEdit(id) {
		PostAPI({ pathName: `/intervention/update/${id}`, data: '' })
	}

	function handleDelete(id) {
		DeleteAPI({ pathName: `/intervention/${id}` })
	}

	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '0.5rem' }}>
				<Grid container alignItems='center'>
					<Grid item xs>
						{intervention.Histopathology}
					</Grid>
					<Grid item xs>
						{intervention.Localisation}
					</Grid>
					<Grid item xs>
						{intervention.Date.toString().slice(0, 10)}
					</Grid>
					<Grid item xs>
						<Button
							variant='contained'
							onClick={() => handleEdit(intervention._id)}
						>
							EDIT
						</Button>
					</Grid>

					<Grid item xs>
						<Button
							variant='contained'
							onClick={() => handleDelete(intervention._id)}
						>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	)
}
