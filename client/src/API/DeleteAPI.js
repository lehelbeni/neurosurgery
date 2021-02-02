import axios from 'axios'

export async function DeleteAPI({ pathName }) {
	console.log(process.env.REACT_APP_SERVER + pathName)
	return await axios.delete(process.env.REACT_APP_SERVER + pathName, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('@token'),
		},
	})
}
