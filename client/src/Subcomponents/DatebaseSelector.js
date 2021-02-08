import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core'
import React, { useState } from 'react'
import { DatebaseName } from '../Resources/Datebases'

export const DatebaseSelector = ({ datebaseSelected, setDatebaseSelected }) => {
	const [currentDatebase, setCurrentDatebase] = useState(datebaseSelected)

	function handleChange(e) {
		setDatebaseSelected(datebase => (datebase = e.target.value))
		setCurrentDatebase(datebase => (datebase = e.target.value))
	}

	return (
		<FormControl>
			<InputLabel id='datebase-select-label'>Datebase</InputLabel>
			<Select
				labelId='datebase-select-label'
				id='datebase-select'
				value={currentDatebase}
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
	)
}
