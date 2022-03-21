import capitalize from 'lodash/capitalize'
import { msToLapTime } from '.'

export const sessions = {
	table: {
		linkRow: true,
		classes: [
			'left',
			'left',
			'left',
			'left',
			'right',
			'right',
			'right',
			'',
			'',
		],
		header: [
			{
				name: 'Date',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'createdDate',
				style: { minWidth: '120px' },
			},
			{
				name: 'Car',
				type: 'sortable',
				addToFilter: true,
				property: 'carName',
			},
			{
				name: 'Track',
				type: 'sortable',
				addToFilter: true,
				property: 'trackName',
			},
			{
				name: 'Session Type',
				type: 'sortable',
				addToFilter: true,
				property: 'sessionType',
			},
			{
				name: 'Stints',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: false,
				property: 'totalStints',
			},
			{
				name: 'Laps',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: false,
				property: 'totalLaps',
			},
			{
				name: 'Best Lap Time',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: false,
				property: 'bestLapTime',
			},
			{
				name: 'id',
				hidden: true,
			},
			{
				name: 'sessionId',
				hidden: true,
			},
			{
				name: 'umbrellaCarId',
				hidden: true,
			},
			{
				name: 'umbrellaTrackId',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			createdDate,
			carName,
			trackName,
			sessionId,
			sessionType,
			totalStints,
			totalLaps,
			bestLapTime,
			id,
			umbrellaCarId,
			umbrellaTrackId,
		}) => {
			return {
				createdDate: createdDate
					? $dateFns.format(
							/[\\[\]']/.test(createdDate)
								? createdDate.slice(0, -5)
								: createdDate,
							'yyyy-MM-dd'
					  )
					: '',
				carName: carName || '',
				trackName: trackName || '',
				sessionType: capitalize(sessionType) || '',
				totalStints: totalStints || '',
				totalLaps: totalLaps === 0 ? '< 1' : totalLaps || '',
				bestLapTime:
					bestLapTime && `${bestLapTime}` !== '-1'
						? `${bestLapTime}`.includes(':')
							? bestLapTime
							: msToLapTime(bestLapTime, $dateFns)
						: '-',
				sessionId: sessionId || '',
				id,
				umbrellaCarId: umbrellaCarId || '',
				umbrellaTrackId: umbrellaTrackId || '',
			}
		},
}
