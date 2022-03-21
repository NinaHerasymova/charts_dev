import {
	msToLapTime,
	addZero,
	withDecimalsCases,
	addClassSpecification,
} from '~/utils'

function classesSpecificationCompare(
	lap,
	session,
	$dateFns,
	property,
	lapProperty
) {
	if (!session[property]) return `full-width-font`
	const sectorSession = msToLapTime(session[property], $dateFns)
	// Stint time compare
	const stint = session.stints.find(
		(stint) => msToLapTime(stint[property], $dateFns) === lap[lapProperty]
	)?.[property]

	return addClassSpecification(
		sectorSession,
		msToLapTime(stint, $dateFns),
		lap[lapProperty]
	)
}

export const sessionDetailed = {
	isElectric: false,
	get electric() {
		return this.isElectric
	},
	set electric(val) {
		this.isElectric = val
	},
	table: {
		linkRow: true,
		classes: [
			'left',
			'centered',
			'centered',
			'centered',
			'centered',
			'centered',
			'centered',
			'right',
		],
		tooltip: {
			placement: 'bottom-end',
			delay: { show: 200, hide: 100 },
			render(session) {
				const { trackTemperature, avgPathWetness } = session
				const trackTemp = trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-'
				const waterOnTrack = avgPathWetness
					? `${withDecimalsCases(avgPathWetness * 100, 1)} %`
					: '-'

				if (sessionDetailed.electric) {
					return `<div class="is-block has-text-left">
										<b class="pr-1">Avg. Power Mode:</b> ${withDecimalsCases(
											session.averagePowerMode,
											2
										)} <br />
										<b class="pr-1">Avg. Regen Mode:</b> ${withDecimalsCases(
											session.averageRegenMode,
											2
										)} <br />
										<b class="pr-1">Gross Energy Used:</b> ${withDecimalsCases(
											session.grossEnergyUsed,
											2
										)}<br />
										<b class="pr-1">Gross Regen Energy:</b> ${withDecimalsCases(
											session.grossRegenEnergy,
											2
										)} <br />
										<b class="pr-1">Track Temperature:</b> ${trackTemp}<br />
										<b class="pr-1">Water on Track:</b> ${waterOnTrack}
									</div>`
				}
				return `<b class="pr-1">Avg. Fuel Mix Mode:</b> ${withDecimalsCases(
					session.averagePowerMode,
					2
				)} <br />
				<b class="pr-1">Track Temperature:</b> ${trackTemp}<br />
				<b class="pr-1">Water on Track:</b> ${waterOnTrack}`
			},
		},
		header: [
			{
				name: 'Lap',
				classes: 'full-width-font',
				property: 'lapNumber',
			},
			{
				name: 'Lap Status',
				property: 'lapStatus',
				customTooltipResult: {
					show: true,
					value: ({ lapState }) => lapState,
				},
			},
			{
				name: 'Lap Time',
				classes: (lap, session, $dateFns) =>
					classesSpecificationCompare(
						lap,
						session,
						$dateFns,
						'bestLapTime',
						'lapTime'
					),
				property: 'lapTime',
			},
			{
				name: 'Sector 1',
				classes: (lap, session, $dateFns) =>
					classesSpecificationCompare(
						lap,
						session,
						$dateFns,
						'bestSectorOne',
						'sectorOne'
					),
				property: 'bestSectorOne',
			},
			{
				name: 'Sector 2',
				classes: (lap, session, $dateFns) =>
					classesSpecificationCompare(
						lap,
						session,
						$dateFns,
						'bestSectorTwo',
						'sectorTwo'
					),
				property: 'bestSectorTwo',
			},
			{
				name: 'Sector 3',
				classes: (lap, session, $dateFns) =>
					classesSpecificationCompare(
						lap,
						session,
						$dateFns,
						'bestSectorThree',
						'sectorThree'
					),
				property: 'bestSectorThree',
			},
			{
				get name() {
					return sessionDetailed.electric ? 'Energy used' : 'Fuel used'
				},
				property: 'fuelUsed',
				classes: 'full-width-font no-underline',
			},
			{
				name: 'Tire Wear (%)',
				classes: 'full-width-font',
				property: 'tireWear',
				style: { width: '170px' },
			},
			{
				name: 'ID',
				hidden: true,
			},
			{
				name: 'LapState',
				hidden: true,
			},
			{
				name: 'averageRegenMode',
				hidden: true,
			},
			{
				name: 'grossRegenEnergy',
				hidden: true,
			},
			{
				name: 'averagePowerMode',
				hidden: true,
			},
			{
				name: 'grossEnergyUsed',
				hidden: true,
			},
			{
				name: 'averageBrakeMode',
				hidden: true,
			},
			{
				name: 'trackTemperature',
				hidden: true,
			},
			{
				name: 'avgPathWetness',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			id,
			lapNumber,
			lapState,
			lapTime,
			usedFuel,
			leftFrontWheelTireWear,
			rightFrontWheelTireWear,
			leftRearWheelTireWear,
			rightRearWheelTireWear,
			averageRegenMode,
			grossRegenEnergy,
			averagePowerMode,
			grossEnergyUsed,
			averageBrakeMode,
			sectorOne,
			sectorTwo,
			sectorThree,
			trackTemperature,
			avgPathWetness,
		}) => {
			let lapStatus = ''
			let lapStatusLabel = ''

			if (lapState) {
				switch (lapState) {
					case 'INV':
						lapStatusLabel = 'Invalid Lap'
						lapStatus =
							'<span class="icon"><i class="icon-invalidlap"></i></span>'
						break
					case 'OK':
						lapStatusLabel = 'Ok Lap'
						lapStatus = '<span class="icon"><i class="icon-oklap"></i></span>'
						break
					case 'IN':
						lapStatusLabel = 'In Lap'
						lapStatus = '<span class="icon"><i class="icon-inlap"></i></span>'
						break
					case 'OUT':
						lapStatusLabel = 'Out Lap'
						lapStatus = '<span class="icon"><i class="icon-outlap"></i></span>'
						break
					case 'OUT_IN':
						lapStatusLabel = 'Out In Lap'
						lapStatus =
							'<span class="icon"><i class="icon-outinlap"></i></span>'
						break
					case 'OUT_ESC':
						lapStatusLabel = 'ESC Lap'
						lapStatus = '<span class="icon"><i class="icon-esclap2"></i></span>'
						break
					case 'ESC':
						lapStatusLabel = 'ESC Lap'
						lapStatus = '<span class="icon"><i class="icon-esclap"></i></span>'
						break
				}
			}

			const tireWearStr = `${addZero(leftFrontWheelTireWear * 100)}
		${addZero(rightFrontWheelTireWear * 100)}
		${addZero(leftRearWheelTireWear * 100)}
		${addZero(rightRearWheelTireWear * 100)}`

			return {
				lapNumber: lapNumber ? `${lapNumber}` : '',
				lapStatus,
				lapTime: lapTime && lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '-',
				sectorOne:
					sectorOne && sectorOne > 0 ? msToLapTime(sectorOne, $dateFns) : '-',
				sectorTwo:
					sectorTwo && sectorTwo > 0 ? msToLapTime(sectorTwo, $dateFns) : '-',
				sectorThree:
					sectorThree && sectorThree > 0
						? msToLapTime(sectorThree, $dateFns)
						: '-',
				fuelUsed: usedFuel
					? sessionDetailed.electric
						? `${withDecimalsCases(usedFuel, 2)} %`
						: `${withDecimalsCases(usedFuel, 2)} L`
					: '',
				tireWear: tireWearStr,
				id,
				lapState: lapStatusLabel,
				averageRegenMode,
				grossRegenEnergy,
				averagePowerMode,
				grossEnergyUsed,
				averageBrakeMode,
				trackTemperature,
				avgPathWetness,
			}
		},
}
