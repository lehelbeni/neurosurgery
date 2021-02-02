import { Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export const InterventionList = () => {
	const [interventionList, setInterventionList] = useState()
	useEffect(() => {
		async function GetData() {
			const data = await GetAPI({ pathName: `/` })
		}
		GetData()
	}, [])

	return <Paper></Paper>
}
