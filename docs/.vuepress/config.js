module.exports = {
	title: "xutao's blog",
	description: '个人知识框架整理，便于查缺漏。前端 HTML CSS ES JS Webpack Test Git Vue React Node Express Koa',
	locales: {
		'/': {
			lang: 'zh-CN'
		}
	},
	head: [['link', { rel: 'icon', href: '/favicon.png' }]],
	themeConfig: {
		lastUpdated: '上次更新',
		repo: 'xutao0793/blog',
		nav: [
			{ text: 'HTML', link: '/HTML/' },
			{ text: 'CSS', link: '/CSS/' },
			{ text: 'ES', link: '/ES/' },
			{ text: 'Browser', link: '/Browser/' },
			{
				text: 'FE-Framework',
				items: [
					{
						text: 'Web',
						items: [
							{ text: 'Vue', link: '/FE-Framework/Vue/' },
							{ text: 'React', link: '/FE-Framework/React/' }
						]
					},
					{
						text: 'Mobile',
						items: [
							{ text: 'H5', link: '/FE-Framework/H5/' },
							{ text: 'React-Native', link: '/FE-Framework/React-Native/' },
							{ text: 'Hybrid', link: '/FE-Framework/Hybrid/' },
							{ text: 'MiniProgram', link: '/FE-Framework/MiniProgram/' }
						]
					},
					{
						text: 'Desktop',
						items: [
							{
								text: 'PWA',
								link: '/FE-Framework/PWA/'
							},
							{
								text: 'Electron',
								link: '/FE-Framework/Electron/'
							}
						]
					},
					{
						text: 'Multi-End',
						items: [
							{ text: 'uni-app', link: '/FE-Framework/uni-app/' },
							{ text: 'Taro', link: '/FE-Framework/Taro/' },
							{ text: 'Flutter', link: '/FE-Framework/Flutter/' }
						]
					}
				]
			},
			{
				text: 'Build',
				items: [
					{
						text: 'Build',
						items: [{ text: 'Gulp', link: '/Build/Gulp/' }, { text: 'Webpack', link: '/Build/Webpack/' }]
					},
					{ text: 'Version', items: [{ text: 'Git', link: '/Build/Git/' }] },
					{ text: 'Test', items: [{ text: 'Jest', link: '/Build/Jest/' }] },
					{
						text: 'Linter',
						items: [
							{ text: 'Eslint', link: '/Build/ESLint/' },
							{ text: 'Typescript', link: '/Build/Typescript/' }
						]
					},
					{
						text: 'Doc',
						items: [{ text: 'EsDoc', link: '/Build/EsDoc/' }]
					}
				]
			},
			{
				text: 'Tools',
				items: [
					{ text: 'Vscode', link: '/Tools/Vscode/' },
					{ text: 'Vuepress', link: '/Tools/Vuepress/' },
					{ text: 'Markdown', link: '/Tools/Markdown/' },
					{ text: 'Powershell', link: '/Tools/Powershell/' }
				]
			},
			{
				text: 'Network',
				items: [
					{ text: 'Ajax', link: '/Network/Ajax/' },
					{ text: 'Axios', link: '/Network/Axios/' },
					{ text: 'Fetch', link: '/Network/Fetch/' },
					{ text: 'RESTful API', link: '/Network/RESTful/' },
					{ text: 'GraphQL', link: '/Network/GraphQL/' }
				]
			},
			{ text: 'Node', link: '/Node/' },
			{
				text: 'BE-Framework',
				items: [
					{ text: 'Express', link: '/BE-Framework/Express/' },
					{ text: 'Koa', link: '/BE-Framework/Koa/' }
				]
			},
			{ text: 'Misc', link: '/Misc/' }
		],

		sidebar: {
			'/ES/': [
				'',
				{
					title: '',
					collapsable: false,
					children: ['DefineProperty']
				}
			],
			'/FE-Framework/Vue/': [
				'',
				{
					title: '',
					collapsable: false,
					children: ['reactive-vue2']
				}
			],
			'/Build/Webpack/': [
				'',
				{
					title: '基础入门',
					collapsable: false,
					children: ['Intro', 'Module', 'InstallAndUsage']
				},
				{
					title: '配置项',
					collapsable: false,
					children: ['Entry', 'Output']
				},
				{
					title: '项目构建实践',
					collapsable: false,
					children: ['Html']
				},
				{
					title: '进阶深入源码',
					collapsable: false,
					children: ['ResourceCode']
				}
			],
			'/Misc/': [
				'',
				{
					title: '',
					collapsable: false,
					children: ['InitDevEnv', 'tree-node-cli']
				}
			],
			'/Node/': [
				'',
				{
					title: '认识Node',
					collapsable: false,
					children: ['introduce', 'nvm', 'npm-yarn', 'npx']
				},
				{
					title: '核心概念',
					collapsable: false,
					children: ['eventloop', 'global', 'module', 'concept']
				},
				{
					title: '文件和数据操作',
					collapsable: false,
					children: ['buffer', 'stream', 'path', 'fs']
				},
				{
					title: '网络管理',
					collapsable: false,
					children: ['http', 'url', 'querystring']
				}
				// {
				// 	title: '进程管理',
				// 	collapsable: false,
				// 	children: ['process', 'child-process', 'cluster', 'worker_threads']
				// },
				// {
				// 	title: '工具模块',
				// 	collapsable: false,
				// 	children: ['util', 'timer', 'crypto', 'zlib']
				// },
				// {
				// 	title: '调试',
				// 	collapsable: false,
				// 	children: ['erros', 'console', 'debugger', 'repl']
				// },
				// {
				// 	title: '系统',
				// 	collapsable: false,
				// 	children: ['os', 'v8', 'vm']
				// },
			],
			'/Build/Git/': [
				'',
				{
					title: '',
					collapsable: false,
					children: ['InitGit', 'UseGit']
				}
			],
			'/Build/Typescript/': [
				'',
				{
					title: '基础',
					collapsable: false,
					children: [
						'WhatAndWhy',
						'InstallTS',
						'BaseType',
						'AdvancedType',
						'Generics',
						'Interface',
						'Class',
						'Module',
						'Declaration',
						'Tsconfig'
					]
				},
				{
					title: '实践',
					collapsable: false,
					children: ['EnumPractice', 'TsNodeEnvConf', 'TsVueEnvConf']
				}
			]
		}
	}
}
