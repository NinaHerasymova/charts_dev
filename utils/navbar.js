export default {
	navigation: [
		{
			name: 'Home',
			path: '/',
		},
		{
			name: 'Garage',
			path: '/garage',
		},
		/* {
			name: 'Track Records',
			path: '/track-records',
		}, */
		{
			name: 'Communities',
			path: '/communities',
		},
	],
	notification: {
		haveNotification: 4,
		showNotification: false,
		icon: {
			parentClass: '',
			iconName: 'icon-notification',
		},
		messages: [
			{
				id: 0,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 1,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Feature: Teams!',
				text: 'Fidgrove added new feature. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 2,
				icon: 'icon-add',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 3,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 4,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 5,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Feature: Teams!',
				text: 'Fidgrove added new feature. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 6,
				icon: 'icon-add',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
			{
				id: 7,
				srcImage: '/img/fidgrove_icon.png',
				title: 'New Platform version!',
				text: 'Platform update version 0.0.2 is available. <a class="link">View release notes</a>',
				read: false,
			},
		],
	},
	profile: {
		showUserMenu: false,
		menu: [
			{
				name: 'Profile',
				path: '/profile',
				icon: {
					parentClass: 'is-small mr-4',
					iconName: 'icon-user',
				},
			},
			{
				name: 'Settings',
				path: '/settings',
				icon: {
					parentClass: 'is-small mr-4',
					iconName: 'icon-option',
				},
			},
			// TODO: Notifications
			/* {
				name: 'Notifications',
				path: '/notifications-center',
				icon: {
					parentClass: 'is-small mr-4',
					iconName: 'icon-notification',
				},
			}, */
			{
				name: 'Download DataLogger',
				link: 'https://public.fidgrove.com/DataLogger/FidgroveDataLoggerInstaller.exe',
				icon: {
					parentClass: 'is-small mr-4',
					iconName: 'icon-download',
				},
			},
		],
	},
}
