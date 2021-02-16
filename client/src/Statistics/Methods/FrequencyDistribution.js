export const frequencyDistribution = (variable, param) => {
	const map = {}
	for (let i = 0; i < variable.length; i++) {
		map[variable[i][param]] = (map[variable[i][param]] || 0) + 1
	}
	return map
}
