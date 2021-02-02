import { Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { DeleteAPI } from '../API/DeleteAPI'
import { PostAPI } from '../API/PostAPI'
import { EditPatient } from '../EditPatient/EditPatient'

export const PatientBox = ({ patient, setRefresh }) => {
	const [edit, setEdit] = useState(false)
	const [newPatient, setNewPatient] = useState(patient)

	const handleChange = prop => event => {
		setNewPatient(values => ({ ...values, [prop]: event.target.value }))
	}

	function handleEdit(id) {
		setEdit(prev => !prev)
	}

	function handleDelete(id) {
		DeleteAPI({ pathName: `/patient/${id}` })
		setRefresh(true)
	}

	return (
		<Grid item xs={12}>
			<Paper style={{ padding: '0.5rem' }}>
				<Grid container alignItems='center'>
					<Grid item xs>
						{patient.Nume}
					</Grid>
					<Grid item xs>
						{patient.Prenume}
					</Grid>
					<Grid item xs>
						{patient.CNP}
					</Grid>
					<Grid item xs>
						{patient.DataDeNastere}
					</Grid>
					<Grid item xs>
						{patient.Sex}
					</Grid>
					<Grid item xs>
						{patient.Varsta}
					</Grid>

					<Grid item xs>
						<Button variant='contained' onClick={() => handleEdit(patient._id)}>
							EDIT
						</Button>
					</Grid>

					<Grid item xs>
						<Button
							variant='contained'
							onClick={() => handleDelete(patient._id)}
						>
							Delete
						</Button>
					</Grid>
				</Grid>
				{edit ? (
					<EditPatient
						patient={newPatient}
						setRefresh={setRefresh}
						setDone={setEdit}
						setInt={setNewPatient}
					/>
				) : null}
			</Paper>
		</Grid>
	)
}
