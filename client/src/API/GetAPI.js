import axios from 'axios'

export async function GetAPI({ pathName }) {
	return await axios.get(process.env.REACT_APP_SERVER + pathName, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('@token'),
		},
	})
}
