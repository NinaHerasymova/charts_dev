const MILISECONDS_HOUR = 3600000

/**
 * Get cookie from request.
 *
 * @param  {Object} req
 * @param  {String} key
 * @return {String|undefined}
 */
export function cookieFromRequest(req, key) {
	if (!req.headers.cookie) {
		return
	}

	const cookie = req.headers.cookie
		.split(';')
		.find((c) => c.trim().startsWith(`${key}=`))

	if (cookie) {
		return cookie.split('=')[1]
	}
}

/**
 * Get value from meter to km
 *
 * @param  {Number} meters
 * @return {String}
 */

export function convertToKm(km) {
	return `${withDecimalsCases(km, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`
}

/**
 * miliseconds to hh:mm
 *
 * @param  {Number} duration
 * @return {String}
 */

export function msToTime(
	duration,
	dateFns = this.$dateFns,
	forTotals = false,
	showMinutes = false
) {
	if (!duration || !dateFns) return

	if (duration >= MILISECONDS_HOUR && !forTotals) {
		return `${dateFns
			.format(new Date(duration - MILISECONDS_HOUR), 'H')
			.toLocaleString()} h ${dateFns
			.format(new Date(duration), 'm')
			.toLocaleString()} min`
	} else if (duration >= MILISECONDS_HOUR && forTotals) {
		return `${dateFns
			.format(new Date(duration - MILISECONDS_HOUR), 'H')
			.toLocaleString()} h`
	} else {
		if (showMinutes)
			return `${dateFns.format(new Date(duration), 'm').toLocaleString()} min`

		return `< 1 h`
	}
}

export function msToLapTime(
	duration,
	dateFns = this.$dateFns,
	removeMilliseconds = false,
	diff = false
) {
	if (!duration || !dateFns) return
	let time = ''
	const t = dateFns.addMilliseconds(new Date(0), duration * 1000)

	if (duration * 1000 >= 3600000) {
		time = !removeMilliseconds
			? dateFns.format(dateFns.addHours(t, -1), 'hh:mm:ss.SSS')
			: dateFns.format(dateFns.addHours(t, -1), 'hh:mm:ss')

		if (diff) {
			time = dateFns.format(t, '+h:ss.SSS')
		}
	} else {
		time = !removeMilliseconds
			? dateFns.format(t, 'mm:ss.SSS')
			: dateFns.format(t, 'mm:ss')

		if (diff) {
			time = dateFns.format(t, '+s.SSS')
		}
	}

	return time
}

const numberLength = (number) => {
	let length = 0
	let n = Math.abs(number)

	do {
		n /= 10
		length++
	} while (n >= 1)

	return length
}

export function addZero(number) {
	const num = withDecimalsCases(number, 0)
	const length = numberLength(num)
	switch (length) {
		case 0:
		case 1:
			return `<span class="is-invisible">0</span><span class="is-invisible">0</span>${num}`
		case 2:
			return `<span class="is-invisible">0</span>${num}`
		case 3:
		default:
			return num
	}
}

export function withDecimalsCases(num, decimalCases) {
	const step = Math.pow(10, decimalCases || 0)
	const temp = Math.trunc(step * num)

	return (temp / step).toFixed(decimalCases)
}

export function giveSpaceAfterNumbersOnString(str) {
	if (!str) return
	const count = str.replace(/[^0-9]/g, '').length
	return str.replace(new RegExp(`([0-9]{${count}})`, 'g'), '$1 ')
}

/**
 * 	this function allowed to order by object/string/array at the same time. It's used on setupDetails.
 * 	mapKeys will be the ordered array from frontend, which will order the real object (object parameter)
 *
 *  @param  {Object} object
 * 	@param  {Object || Array} mapKeys
 * 	@param  {Object} orderedBreaks
 *
 *  @return {Object}
 *
 */

export function sortResultByObject(object, mapKeys, orderedBreaks = {}) {
	// check if have array on object properties
	if (Array.isArray(mapKeys)) {
		mapKeys.forEach((key) => {
			if (typeof key === 'string') {
				// if value exists, add property and value
				orderedBreaks = {
					...orderedBreaks,
					...(object[key] && { [key]: object[key] }),
				}
			} else {
				orderedBreaks = sortResultByObject(object, key, orderedBreaks)
			}
		})
	} else if (
		typeof mapKeys === 'object' &&
		!Array.isArray(mapKeys) &&
		Object.entries(mapKeys).length
	) {
		// check if have more levels (objects) on object properties
		Object.entries(mapKeys).forEach(([key, values]) => {
			orderedBreaks = {
				...orderedBreaks,
				// Using recursive way for mapping the order of the orginal value
				[key]: sortResultByObject(object[key], values),
			}
		})
	}

	return orderedBreaks
}

/**
 * This function is only a workaround until API is not ready.
 *
 * @param {String} type the type of the current result string we need.
 * @param {String} stringResult the string will be manipulated depending on the type
 *
 */

export function needToCapitalize(type, stringResult) {
	if (type === 'type') {
		return this.capitalize(stringResult)
	}

	return stringResult
}

/**
 *
 * This function compares Object like Sessions, stints and Laps with a specific property,
 * if they are equal, they have an specific class on html
 *
 * @param {String} session
 * @param {String} stint
 * @param {String} lap
 *
 */

export function addClassSpecification(session, stint, lap) {
	let classes = ''

	if (stint && stint === lap && session === lap) {
		classes = `has-text-purple`
	} else if (stint && stint === lap) {
		classes = `has-text-success`
	} else {
		classes = ''
	}

	return `full-width-font ${classes}`
}
