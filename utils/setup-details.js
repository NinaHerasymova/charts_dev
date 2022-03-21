export const setupDetails = {
	topMenu: {
		areTabs: true,
		menu: [
			{
				name: 'Setup Summary',
				property: 'summary',
			},
			{
				name: 'Gears',
				property: 'gears',
				sort: [
					{
						gears: [
							'firstGear',
							'secondGear',
							'thirdGear',
							'fourGear',
							'fiveGear',
							'sixGear',
							'sevenGear',
							'eightGear',
							'nineGear',
							'ratio',
							'finalDrive',
							'reverse',
						],
					},
					{
						engine: ['revLimiter', 'engineMixture', 'boostMapping', 'brakeMap'],
					},
					{ autoUpShiftDownShift: ['autoUpShift', 'autoDownShift'] },
				],
			},
			{
				name: 'Tires',
				property: 'tires',
				sort: [
					'symmetric',
					{
						front: [
							{ left: ['tirePressure', 'camber'] },
							{ right: ['tirePressure', 'camber'] },
							'compound',
						],
					},
					{
						rear: [
							{ left: ['tirePressure', 'camber'] },
							{ right: ['tirePressure', 'camber'] },
							'compound',
						],
					},
				],
			},
			{
				name: 'Brakes',
				property: 'brakes',
				sort: [
					'symmetric',
					{
						front: {
							left: ['disc'],
							right: ['disc'],
						},
					},
					{
						rear: {
							left: ['disc'],
							right: ['disc'],
						},
					},
					{
						bias: ['brakeBias'],
					},

					{
						other: ['brakeDuctBlanking', 'maxPedalForce', 'handBrakePressure'],
					},
				],
			},
			{
				name: 'Chassis',
				property: 'chassis',
				sort: [
					'symmetric',
					'frontWheelTrack',
					'rearWheelTrack',
					{ weightDto: ['vertical', 'lateral', 'weightDistribution', 'wedge'] },
					{
						advanced: {
							left: ['fenderFlareFlipUps', 'trackBar', 'caster'],
							right: ['fenderFlareFlipUps', 'trackBar', 'caster'],
						},
					},
					{ steering: ['steerLock'] },
					'chassisAdjustment1',
					'chassisAdjustment2',
					'chassisAdjustment3',
					'chassisAdjustment4',
					'chassisAdjustment5',
					'chassisAdjustment6',
					'chassisAdjustment7',
					'chassisAdjustment8',
					'chassisAdjustment9',
					'chassisAdjustment10',
					'chassisAdjustment11',
					'chassisAdjustment12',
				],
			},
			{
				name: 'Suspension',
				property: 'suspension',
				sort: [
					'symmetric',
					{
						front: [
							{
								left: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
									'rideHeight',
									'springRubber',
								],
							},
							{
								thirdRd: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
								],
							},
							{
								right: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
									'rideHeight',
									'springRubber',
								],
							},
							'antiSway',
							'toeIn',
							'toeOffset',
						],
					},
					{
						rear: [
							{
								left: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
									'rideHeight',
									'springRubber',
								],
							},
							{
								thirdRd: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
								],
							},
							{
								right: [
									'springRate',
									'slowBump',
									'slowRebound',
									'fastBump',
									'fastRebound',
									'packers',
									'rideHeight',
									'springRubber',
								],
							},
							'antiSway',
							'toeIn',
							'toeOffset',
						],
					},
				],
			},
			{
				name: 'Aerodynamics',
				property: 'aerodynamics',
				sort: ['frontDownforce', 'rearDownforce', 'grilleTape'],
			},
			{
				name: 'Electronics',
				property: 'electronics',
				sort: [
					'tractionControl',
					'antiLockBrakes',
					'onboardTractionControl',
					'onboardAntiLockBrakes',
				],
			},
			{
				name: 'Drivetrain',
				property: 'drivetrain',
				sort: ['pump', 'power', 'coast', 'preload', 'torqueSplit'],
			},
		],
	},
	bottomMenu: {
		redHover: true,
		mapResult: ({
			link,
			pathToListOfSession,
			linkForListOfSetups,
			listOfSessionCallback,
		}) => {
			return [
				{
					name: 'Download Setup File',
					link,
					icon: {
						parentClass: 'is-small',
						iconName: 'icon-download',
					},
				},
				{
					name: 'Setup Sessions',
					path: pathToListOfSession,
					callback: listOfSessionCallback,
					icon: {
						parentClass: 'is-small',
						iconName: 'icon-filter-menu',
					},
				},
				{
					name: 'List of Setups',
					path: linkForListOfSetups,
					icon: {
						parentClass: 'is-small',
						iconName: 'icon-menu-left',
					},
				},
			]
		},
	},
}
