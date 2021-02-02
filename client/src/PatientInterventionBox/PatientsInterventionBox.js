import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DeleteAPI } from '../API/DeleteAPI'
import { PostAPI } from '../API/PostAPI'
import { EditIntervention } from '../EditIntervention/EditIntervention'

export const PatientsInterventionBox = ({ intervention, setRefresh }) => {
	const [edit, setEdit] = useState(false)
	const [newIntervention, setNewIntervention] = useState({
		_id: intervention._id,
		db: intervention.db,
		CNP: intervention.CNP,
		Histopathology: intervention.Histopathology,
		Localisation: intervention.Localisation,
		Date: intervention.Date,
	})

	const handleChange = prop => event => {
		setNewIntervention(values => ({ ...values, [prop]: event.target.value }))
	}

	function handleEdit(id) {
		setEdit(prev => !prev)
	}

	function handleDelete(id) {
		DeleteAPI({ pathName: `/intervention/${id}` })
		setRefresh(true)
	}

	console.log(intervention)
	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '0.5rem' }}>
				<Grid container alignItems='center'>
					<Grid item xs>
						{intervention.Nume}
					</Grid>
					<Grid item xs>
						{intervention.Prenume}
					</Grid>
					<Grid item xs>
						{intervention.CNP}
					</Grid>
					<Grid item xs>
						{intervention.Sex}
					</Grid>

					<Grid item xs>
						{intervention.Histopathology}
					</Grid>
					<Grid item xs>
						{intervention.Localisation}
					</Grid>
					<Grid item xs>
						{intervention.Date ? intervention.Date.toString().slice(4, 15) : ''}
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
				{edit ? (
					<EditIntervention
						intervention={newIntervention}
						setRefresh={setRefresh}
						setDone={setEdit}
						setInt={setNewIntervention}
					/>
				) : null}
			</Paper>
		</Grid>
	)
}
