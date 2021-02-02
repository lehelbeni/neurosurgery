import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
	menubutton: {
		flexGrow: 0,
		padding: '10px',
	},
}))

export const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#009688',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
})
