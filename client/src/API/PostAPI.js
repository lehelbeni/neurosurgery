import axios from 'axios'

export async function PostAPI({ pathName, data }) {
	console.log(data)
	return await axios.post(process.env.REACT_APP_SERVER + pathName, data, {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('@token'),
		},
	})
}
