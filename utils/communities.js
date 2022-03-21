import isEmpty from 'lodash/isEmpty'
import { msToLapTime, withDecimalsCases } from '~/utils'

export const userCommunities = {
	table: {
		linkRow: true,
		classes: ['left', 'centered', 'centered', 'centered', 'right'],
		header: [
			{
				name: 'Community',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: true,
				property: 'name',
			},
			{
				name: 'Type',
				type: 'sortable',
				classes: 'full-width-font',
				addToFilter: true,
				property: 'public',
			},
			{
				name: 'Role',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'isAdmin',
			},
			{
				name: 'Join Date',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'joinedDate',
			},
			{
				name: '# Users',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'totalMembers',
			},
			{
				name: 'communityId',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			communityId,
			name,
			public: isPublic,
			isAdmin,
			joinedDate,
			totalMembers,
		}) => ({
			name: name || '',
			public: isPublic ? 'Public' : 'Private',
			isAdmin: isAdmin ? 'Admin' : 'Member',
			joinedDate: joinedDate ? $dateFns.format(joinedDate, 'yyyy-MM-dd') : '',
			totalMembers,
			communityId,
		}),
}

export const publicCommunities = {
	table: {
		linkRow: true,
		classes: ['left', 'left', 'right'],
		header: [
			{
				name: 'Community',
				type: 'sortable',
				addToFilter: true,
				property: 'name',
			},
			{
				name: 'Description',
				property: 'description',
			},
			{
				name: '# Users',
				type: 'sortable',
				property: 'totalMembers',
			},
			{
				name: 'communityId',
				hidden: true,
			},
			{
				name: 'joinedDate',
				hidden: true,
			},
			{
				name: 'isAdmin',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			communityId,
			name,
			description,
			totalMembers,
			joinedDate,
			isAdmin,
		}) => ({
			name,
			description,
			totalMembers,
			communityId,
			joinedDate: !isEmpty(joinedDate),
			isAdmin,
		}),
}

export const communityProfile = {
	table: {
		linkRow: true,
		classes: ['left', 'centered', 'centered', 'centered'],
		header: [
			{
				name: 'Driver',
				type: 'sortable',
				property: 'username',
				classes: 'full-width-font',
			},
			{
				name: 'Date (joined)',
				type: 'sortable',
				property: 'joinedDate',
				classes: 'full-width-font',
			},
			{
				name: 'Role',
				type: 'sortable',
				property: 'isAdmin',
				classes: 'full-width-font',
			},
			{
				name: 'userId',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({ username, isAdmin, joinedDate, userId }) => {
			return {
				username,
				joinedDate:
					(joinedDate &&
						$dateFns.format(
							/[\\[\]']/.test(joinedDate)
								? joinedDate.slice(0, -5)
								: joinedDate,
							'yyyy-MM-dd'
						)) ||
					'',
				isAdmin: isAdmin ? 'Admin' : 'Member',
				userId,
			}
		},
}

export const communityTrackRecords = {
	table: {
		linkRow: true,
		classes: ['left', 'left', 'left', 'right'],
		header: [
			{
				name: 'Track',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'trackName',
			},
			{
				name: 'Car',
				type: 'sortable',
				classes: 'full-width-font',
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
				name: 'Driver',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'username',
			},
			{
				name: 'trackTemperature',
				hidden: true,
			},
			{
				name: 'avgPathWetness',
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
			trackName,
			carName,
			createdDate,
			lapTime,
			trackTemperature,
			avgPathWetness,
			username,
			umbrellaTrackId,
		}) => ({
			trackName,
			carName,
			lapTime: lapTime && lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '-',
			createdDate,
			username,
			trackTemperature:
				trackTemperature && trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',

			avgPathWetness: avgPathWetness
				? `${withDecimalsCases(avgPathWetness * 100, 1)} %`
				: '-',
			umbrellaTrackId,
		}),
}

export const communityTrackRecordsWithMap = {
	table: {
		linkRow: true,
		classes: [
			'left',
			'left',
			'right',
			'right',
			'right',
			'right',
			'left',
			'right',
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
				classes: 'full-width-font',
				addToFilter: true,
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
				type: 'sortable',
				classes: 'full-width-font',
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
				type: 'sortable',
				classes: 'full-width-font',
				property: 'createdDate',
			},
			{
				name: 'Driver',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'username',
			},
			{
				name: 'trackTemperature',
				hidden: true,
			},
			{
				name: 'avgPathWetness',
				hidden: true,
			},
			{
				name: 'trackVersion',
				hidden: true,
			},
			{
				name: 'umbrellaTrackId',
				hidden: true,
			},
			{
				name: 'umbrellaCarId',
				hidden: true,
			},
		],
	},
	mapResult:
		($dateFns) =>
		({
			carName,
			className,
			lapTime,
			sectorOne,
			sectorTwo,
			sectorThree,
			createdDate,
			trackTemperature,
			avgPathWetness,
			username,
			trackVersion,
			umbrellaTrackId,
			umbrellaCarId,
		}) => ({
			carName,
			className,
			lapTime: lapTime && lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '-',
			sectorOne: sectorOne > 0 ? msToLapTime(sectorOne, $dateFns) : '-',
			sectorTwo: sectorTwo > 0 ? msToLapTime(sectorTwo, $dateFns) : '-',
			sectorThree: sectorThree > 0 ? msToLapTime(sectorThree, $dateFns) : '-',
			createdDate:
				$dateFns.format(
					/[\\[\]']/.test(createdDate) ? createdDate.slice(0, -5) : createdDate,
					'yyyy-MM-dd'
				) || '',
			username,
			trackTemperature:
				trackTemperature && trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',
			avgPathWetness: avgPathWetness
				? `${withDecimalsCases(avgPathWetness * 100, 1)} %`
				: '-',
			trackVersion,
			umbrellaTrackId,
			umbrellaCarId,
		}),
}

export const communityTrackRecordsWithMapAndCar = {
	table: {
		linkRow: true,
		classes: [
			'left',
			'left',
			'centered',
			'centered',
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
				type: 'sortable',
				classes: 'full-width-font',
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
				name: 'Driver',
				type: 'sortable',
				classes: 'full-width-font',
				property: 'username',
			},
			{ name: 'carName', hidden: true },
			{ name: 'trackName', hidden: true },
			{ name: 'lapId', hidden: true },
			{ name: 'trackTemperature', hidden: true },
			{ name: 'avgPathWetness', hidden: true },
			{ name: 'trackVersion', hidden: true },
			{ name: 'carVersion', hidden: true },
			{ name: 'userId', hidden: true },
			{ name: 'processing', hidden: true },
		],
	},
	mapResult:
		($dateFns) =>
		({
			rank,
			createdDate,
			username,
			lapTime,
			diff,
			sectorOne,
			sectorTwo,
			sectorThree,
			trackTemperature,
			avgPathWetness,
			carName,
			trackName,
			lapId,
			carVersion,
			trackVersion,
			userId,
			processing,
		}) => ({
			rank,
			lapTime: lapTime > 0 ? msToLapTime(lapTime, $dateFns) : '',
			diff: diff > 0 ? msToLapTime(diff, $dateFns, false, true) : '-',
			sectorOne: sectorOne > 0 ? msToLapTime(sectorOne, $dateFns) : '-',
			sectorTwo: sectorTwo > 0 ? msToLapTime(sectorTwo, $dateFns) : '-',
			sectorThree: sectorThree > 0 ? msToLapTime(sectorThree, $dateFns) : '-',
			createdDate:
				$dateFns.format(
					/[\\[\]']/.test(createdDate) ? createdDate.slice(0, -5) : createdDate,
					'yyyy-MM-dd'
				) || '',
			username,
			carName: carName || '',
			trackName: trackName || '',
			lapId,
			trackTemperature:
				trackTemperature && trackTemperature
					? `${withDecimalsCases(trackTemperature, 1)} ºC`
					: '-',

			avgPathWetness: avgPathWetness
				? `${withDecimalsCases(avgPathWetness * 100, 1)} %`
				: '-',
			carVersion: carVersion || '-',
			trackVersion: trackVersion || '-',
			userId,
			processing,
		}),
}
