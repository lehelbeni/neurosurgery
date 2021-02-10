import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'

export const DateSelection = ({ setDate, label, date }) => {
	const [selectedDate, setSelectedDate] = useState(new Date(date))

	const handleDateChange = date => {
		setSelectedDate(value => (value = date))
		setDate(prev => (prev = date))
	}
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant='inline'
				format='MM/dd/yyyy'
				margin='normal'
				id='start-date-picker-inline'
				label={label}
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	)
}
