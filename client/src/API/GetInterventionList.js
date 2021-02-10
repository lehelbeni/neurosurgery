import { GetAPI } from './GetAPI'

export async function GetData({ datebaseSelected, startDate, endDate, prop }) {
	const data = await GetAPI({ pathName: `/intervention/bypat` })

	const filtered = data.data.filter(el => {
		el.Date = new Date(el.Date)
		if (
			el.db == datebaseSelected &&
			+el.Date.getTime() >= +startDate.getTime() &&
			+el.Date.getTime() <= +endDate.getTime()
		)
			return el
	})

	const res = await orderList(filtered, prop)

	return res
}

async function orderList(array, prop) {
	function dynamicSort(property) {
		var sortOrder = 1
		if (property[0] === '-') {
			sortOrder = -1
			property = property.substr(1)
		}
		return function (a, b) {
			/* next line works with strings and numbers,
			 * and you may want to customize it to your needs
			 */
			if (prop == 'Date') {
				a[property] = new Date(a[property])
				b[property] = new Date(b[property])
			}

			var result =
				a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
			return result * sortOrder
		}
	}
	return array.sort(dynamicSort(prop))
}
