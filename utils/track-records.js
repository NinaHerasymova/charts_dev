import { msToLapTime, withDecimalsCases } from '~/utils'

export const trackRecords = {
	table: {
		linkRow: true,
		classes: ['left', 'left', 'right', 'left', 'left'],
		tooltip: {
			placement: 'bottom-end',
			delay: { show: 200, hide: 100 },
			render(session) {
				const { trackTemperature, avgPathWetness } = session
				return `
					<b class="pr-1">Track Temperature:</b> ${trackTemperature}<br />
					<b class="pr-1">Water on Track:</b> ${avgPathWetness}
				`
			},
		},
		header: [
			{
				name: 'Track',
				type: 'sortable',
				property: 'trackName',
			},
			{
				name: 'Car',
				type: 'sortable',
				addToFilter: true,
				property: 'carName',
			},
			{
				name: 'Lap Time',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'lapTime',
			},
			{
				name: 'Date',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: true,
				property: 'createdDate',
			},
			{
				name: 'Setup',
				type: 'sortable',
				property: 'setupName',
				linkToOtherPage: {
					link: 'garage-car-setups-setupName',
					params: ({ carName, setupName, setupId }) => ({
						car: carName,
						setupName,
						fileHash: setupId,
					}),
				},
			},
			{ name: 'setupId', hidden: true },
			{ name: 'umbrellaTrackId', hidden: true },
			{ name: 'umbrellaCarId', hidden: true },
			{ name: 'trackTemperature', hidden: true },
			{ name: 'avgPathWetness', hidden: true },
		],
	},
	mapResult:
		($dateFns) =>
		({
			trackName,
			carName,
			lapTime,
			createdDate,
			setupName,
			setupId,
			umbrellaTrackId,
			umbrellaCarId,
			trackTemperature,
			avgPathWetness,
		}) => {
			return {
				trackName: trackName || '',
				carName: carName || '',
				lapTime: lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '',
				createdDate: createdDate || '',
				setupName: setupName || '-',
				setupId,
				umbrellaTrackId,
				umbrellaCarId,
				trackTemperature: trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',
				avgPathWetness: avgPathWetness
					? `${withDecimalsCases(avgPathWetness * 100, 0)}  %`
					: '-',
			}
		},
}

export const trackRecordUniq = {
	table: {
		linkRow: true,
		classes: [
			'left',
			'left',
			'right',
			'right',
			'right',
			'right',
			'right',
			'right',
			'right',
			'left',
			'centered',
			'centered',
			'left',
		],
		tooltip: {
			placement: 'bottom-end',
			delay: { show: 200, hide: 100 },
			render(session) {
				const { trackTemperature, avgPathWetness, trackVersion } = session
				return `
					<b class="pr-1">Track Temperature:</b> ${trackTemperature}<br />
					<b class="pr-1">Water on Track:</b> ${avgPathWetness} <br />
					<b class="pr-1">Track Version:</b> ${trackVersion}
				`
			},
		},
		header: [
			{
				name: 'Car',
				type: 'sortable',
				property: 'carName',
			},
			{
				name: 'Class',
				type: 'sortable',
				property: 'className',
				addToFilter: true,
			},
			{
				name: 'Lap Time',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'lapTime',
			},
			{
				name: 'S1',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorOne',
			},
			{
				name: 'S2',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorTwo',
			},
			{
				name: 'S3',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorThree',
			},
			{
				name: 'Date',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'createdDate',
				addToFilter: true,
			},
			{
				name: 'Setup',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'setupName',
				linkToOtherPage: {
					link: 'garage-car-setups-setupName',
					params: ({ carName, setupName, setupId }) => ({
						car: carName,
						setupName,
						fileHash: setupId,
					}),
				},
			},
			{ name: 'setupId', hidden: true },
			{ name: 'trackTemperature', hidden: true },
			{ name: 'trackVersion', hidden: true },
			{ name: 'umbrellaCarId', hidden: true },
			{ name: 'umbrellaTrackId', hidden: true },
			{ name: 'avgPathWetness', hidden: true },
		],
	},
	mapResult:
		($dateFns) =>
		({
			carName,
			className,
			lapTime,
			createdDate,
			setupName,
			setupId,
			sectorOne,
			sectorTwo,
			sectorThree,
			trackTemperature,
			trackVersion,
			umbrellaCarId,
			umbrellaTrackId,
			avgPathWetness,
		}) => {
			return {
				carName: carName || '',
				className: className || '',
				lapTime: lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '',
				sectorOne: sectorOne > 0 ? msToLapTime(sectorOne, $dateFns) : '-',
				sectorTwo: sectorTwo > 0 ? msToLapTime(sectorTwo, $dateFns) : '-',
				sectorThree: sectorThree > 0 ? msToLapTime(sectorThree, $dateFns) : '-',
				createdDate: createdDate
					? $dateFns.format(
							/[\\[\]']/.test(createdDate)
								? createdDate.slice(0, -5)
								: createdDate,
							'yyyy-MM-dd'
					  )
					: '',
				setupName: setupName || '',
				setupId,
				trackTemperature: trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',
				trackVersion: trackVersion || '-',
				umbrellaCarId: umbrellaCarId || 0,
				umbrellaTrackId: umbrellaTrackId || 0,
				avgPathWetness: avgPathWetness
					? `${withDecimalsCases(avgPathWetness * 100, 0)}  %`
					: '-',
			}
		},
}

export const trackRecordWithMapAndCar = {
	table: {
		linkRow: true,
		classes: [
			'right',
			'right',
			'right',
			'right',
			'right',
			'right',
			'centered',
			'right',
		],
		tooltip: {
			placement: 'bottom-end',
			delay: { show: 200, hide: 100 },
			render({ trackTemperature, avgPathWetness, trackVersion, carVersion }) {
				return `
					<b class="pr-1">Track Temperature:</b> ${trackTemperature}<br />
					<b class="pr-1">Water on Track:</b> ${avgPathWetness} <br />
					<b class="pr-1">Track Version:</b> ${trackVersion} <br />
					<b class="pr-1">Car Version:</b> ${carVersion}
				`
			},
		},
		header: [
			{
				name: 'Rank',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'rank',
				style: { width: '80px' },
			},
			{
				name: 'Lap Time',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'lapTime',
			},
			{
				name: 'Diff',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'diff',
			},
			{
				name: 'S1',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorOne',
			},
			{
				name: 'S2',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorTwo',
			},
			{
				name: 'S3',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'sectorThree',
			},
			{
				name: 'Date',
				classes: 'full-width-font',
				type: 'sortable',
				property: 'createdDate',
				style: { paddingLeft: '32px' },
			},
			{
				name: 'Setup',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'setupName',
				linkToOtherPage: {
					link: 'garage-car-setups-setupName',
					params: ({ setupName, setupId }, store) => ({
						car: store.getters['track/carName'],
						setupName,
						fileHash: setupId,
					}),
				},
			},
			{ name: 'setupId', hidden: true },
			{ name: 'carName', hidden: true },
			{ name: 'trackName', hidden: true },
			{ name: 'lapId', hidden: true },
			{ name: 'trackTemperature', hidden: true },
			{ name: 'avgPathWetness', hidden: true },
			{ name: 'trackVersion', hidden: true },
			{ name: 'carVersion', hidden: true },
		],
	},
	mapResult:
		($dateFns) =>
		({
			rank,
			lapTime,
			diff,
			sectorOne,
			sectorTwo,
			sectorThree,
			createdDate,
			trackTemperature,
			avgPathWetness,
			trackVersion,
			carVersion,
			setupName,
			setupId,
			carName,
			trackName,
			lapId,
		}) => {
			return {
				rank,
				lapTime: lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '',
				diff: diff > 0 ? msToLapTime(diff, $dateFns, false, true) : '-',
				sectorOne: sectorOne > 0 ? msToLapTime(sectorOne, $dateFns) : '-',
				sectorTwo: sectorTwo > 0 ? msToLapTime(sectorTwo, $dateFns) : '-',
				sectorThree: sectorThree > 0 ? msToLapTime(sectorThree, $dateFns) : '-',
				createdDate: createdDate || '',
				setupName: setupName || '',
				setupId,
				carName: carName || '',
				trackName: trackName || '',
				lapId,
				trackTemperature: trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',
				avgPathWetness: avgPathWetness
					? `${withDecimalsCases(avgPathWetness * 100, 0)}  %`
					: '-',
				carVersion: carVersion || '-',
				trackVersion: trackVersion || '-',
			}
		},
}
