import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useStyles } from '../Theme/ThemeProvider'

export const Navigation = () => {
	const classes = useStyles()
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography>Neurosurgery Statistics</Typography>
				<Typography className={classes.menubutton}>
					<Link to='/'>Home</Link>
				</Typography>
				<Typography className={classes.menubutton}>
					<Link to='/patients'>Pacienti</Link>
				</Typography>
				<Typography className={classes.menubutton}>
					<Link to='/interventions'>Interventii</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
