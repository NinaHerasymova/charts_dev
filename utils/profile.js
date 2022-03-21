export default {
	topMenu: {
		menu: [
			{
				name: 'User Info',
				path: '/profile',
				icon: {
					parentClass: 'is-small',
					iconName: 'icon-user',
				},
			},
			{
				name: 'Settings',
				path: '/settings',
				icon: {
					parentClass: 'is-small',
					iconName: 'icon-option',
				},
			},
			// TODO: Notifications
			/* {
				name: 'Notifications',
				path: '/notifications-center',
				icon: {
					parentClass: 'is-small',
					iconName: 'icon-notification',
				},
			}, */
		],
	},
	bottomMenu: {
		haveLogout: true,
		redHover: true,
		menu: [
			{
				name: 'See Shortcut Keys',
				path: '/shortcut-keys',
				icon: {
					parentClass: 'is-small',
					iconName: 'icon-shortcut',
				},
			},
			{
				name: 'Download DataLogger',
				link: 'https://public.fidgrove.com/DataLogger/FidgroveDataLoggerInstaller.exe',
				icon: {
					parentClass: 'is-small',
					iconName: 'icon-download',
				},
			},
		],
	},
}
