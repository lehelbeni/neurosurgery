import {
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core'
import React, { useState } from 'react'
import { Localisations } from '../Resources/Localisations'
export const LocalisationSelector = (localisation, setLocalisation) => {
	const [thisLocalisation, setThisLocalisation] = useState()

	const handleChange = e => {
		setThisLocalisation(prev => e.target.value)
		setLocalisation(prev => e.target.value)
	}

	return (
		<Grid item xs>
			<FormControl>
				<InputLabel id='localisation-select-label'>Localisation</InputLabel>
				<Select
					labelId='localisation-select-label'
					id='localisation-select'
					value={thisLocalisation}
					onChange={handleChange}
				>
					{Localisations.map(loc => {
						return (
							<MenuItem value={loc} key={loc}>
								{loc}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
		</Grid>
	)
}
