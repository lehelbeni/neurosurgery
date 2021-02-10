import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'

const header = [
	{ field: 'id', headerName: 'ID', width: 130 },
	{ field: 'Nume', headerName: 'First name', width: 130 },
	{ field: 'Prenume', headerName: 'Last name', width: 130 },
]

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

export const DataDisplay = ({ data }) => {
	const [selectedData, setSelectedData] = useState()

	useEffect(() => {
		console.log(data)
		const db = data
		console.log(db)
	}, [])

	function handleSelectionChange(newSelection) {
		console.log(newSelection)
		setSelectedData(prev => (prev = newSelection))
	}

	return (
		<DataGrid
			rows={[{ id: 1 }]}
			columns={header}
			pageSize={5}
			checkboxSelection
			onSelectionChange={() => handleSelectionChange}
		/>
	)
}
