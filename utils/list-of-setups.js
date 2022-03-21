import {
	convertToKm,
	giveSpaceAfterNumbersOnString,
	withDecimalsCases,
} from '.'

export const setups = {
	isElectric: false,
	get electric() {
		return this.isElectric
	},
	set electric(val) {
		this.isElectric = val
	},
	table: {
		linkRow: true,
		classes: ['left', 'left', 'left', 'right', 'right', 'right', 'right'],
		header: [
			{
				name: 'Setup Name',
				type: 'sortable',
				property: 'setupName',
				classes: 'full-width-font',
			},
			{
				name: 'Track (Last)',
				type: 'sortable',
				property: 'trackName',
				classes: 'full-width-font',
				addToFilter: true,
			},
			{
				name: 'Date (Last)',
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
			{
				name: 'Time',
				type: 'sortable',
				property: 'totalDriveTime',
				classes: 'full-width-font',
			},
			{
				get name() {
					return setups.electric ? 'eMotor Torque Map' : 'Fuel Load'
				},
				type: 'sortable',
				property: 'fuelLoad',
				classes: 'full-width-font',
			},
			{
				name: 'Tires Compound',
				type: 'sortable',
				property: 'tiresCompound',
				classes: 'full-width-font',
			},
			{
				name: 'fileHash',
				hidden: true,
			},
			{
				name: 'electric',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			engineType,
			setupId,
			setupName,
			frontTireCompoundName,
			rearTireCompoundName,
			fuelLoad,
			motorTorqueMap,
			totalDistance,
			totalDriveTime,
			trackName,
			lastUsage,
		}) => {
			let tiresCompound = ''
			if (frontTireCompoundName === rearTireCompoundName) {
				tiresCompound = frontTireCompoundName
			} else {
				tiresCompound = `${frontTireCompoundName || '-'}/${
					rearTireCompoundName || '-'
				}`
			}

			const electric = engineType === 'Electric'
			const minutes = totalDriveTime / 60
			const helperDate = withDecimalsCases(minutes / 60, 1)

			return {
				setupName: setupName || '',
				trackName: trackName || '',
				lastUsage: lastUsage
					? $dateFns.format(
							/[\\[\]']/.test(lastUsage) ? lastUsage.slice(0, -5) : lastUsage,
							'yyyy-MM-dd'
					  )
					: '',
				totalDistance: convertToKm(totalDistance) || '',
				totalDriveTime: helperDate >= 0 ? `${helperDate} h` : '',
				fuelLoad: electric
					? giveSpaceAfterNumbersOnString(motorTorqueMap)
					: fuelLoad,
				tiresCompound: tiresCompound || '',
				fileHash: setupId || '',
				electric,
			}
		},
}
