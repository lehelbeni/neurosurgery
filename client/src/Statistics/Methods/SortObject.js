export const SortObject = obj => {
	var sortable = []
	for (var el in obj) {
		sortable.push([el, obj[el]])
	}

	sortable.sort(function (a, b) {
		return b[1] - a[1]
	})

	return sortable
}
