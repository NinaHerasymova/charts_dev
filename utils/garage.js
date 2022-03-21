import { convertToKm } from '.'

export const garage = {
	table: {
		linkRow: true,
		classes: ['left', 'left', 'left', 'right'],
		header: [
			{
				name: 'Car',
				type: 'sortable',
				property: 'carName',
			},
			{
				name: 'Class',
				type: 'sortable',
				addToFilter: true,
				property: 'className',
			},
			{
				name: 'Date (last)',
				type: 'sortable',
				property: 'lastUsage',
				classes: 'full-width-font',
			},
			{
				name: 'Distance',
				type: 'sortable',
				property: 'totalDistance',
				classes: 'full-width-font',
			},
			{ name: 'umbrellaCarId', hidden: true },
		],
	},
	mapResult:
		($dateFns) =>
		({ umbrellaCarId, carName, className, lastUsage, totalDistance }) => ({
			carName: carName || '',
			className: className || '',
			lastUsage: lastUsage
				? $dateFns.format(
						/[\\[\]']/.test(lastUsage) ? lastUsage.slice(0, -5) : lastUsage,
						'yyyy-MM-dd'
				  )
				: '',
			totalDistance: convertToKm(totalDistance) || '',
			umbrellaCarId: umbrellaCarId || 0,
		}),
}
