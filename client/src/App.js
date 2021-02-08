import './App.css'
import { Navigation } from './Navigation/Navigation'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './Theme/ThemeProvider'
import { AddPatient } from './AddPatient/AddPatient'
import NewEntry from './NewEntry/NewEntry'
import { Interventions } from './Interventions/Interventions'
import { Patients } from './Patients/Patients'
import { Statistics } from './Statistics/Statistics'
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navigation />
				<div className='main-window'>
					<Route exact path='/' component={NewEntry} />
					<Route path='/interventions' component={Interventions} />
					<Route path='/patients' component={Patients} />
					<Route path='/statistics' component={Statistics} />
				</div>
			</Router>
		</ThemeProvider>
	)
}

export default App
