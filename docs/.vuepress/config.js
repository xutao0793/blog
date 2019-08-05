module.exports = {
    title: "xutao's blog",
    description:
        '个人知识框架整理，便于查缺漏。前端 HTML CSS ES JS Webpack Test Git Vue React Node Express Koa',
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
                        text: 'Desktop',
                        items: [
                            {
                                text: 'Electron',
                                link: '/FE-Framework/Electron/'
                            }
                        ]
                    },
                    {
                        text: 'Mobile',
                        items: [
                            { text: 'Native', link: '/FE-Framework/Native/' },
                            { text: 'H5', link: '/FE-Framework/H5/' },
                            { text: 'Hybrid', link: '/FE-Framework/Hybrid/' },
                            { text: 'Flutter', link: '/FE-Framework/Flutter/' }
                        ]
                    },
                    {
                        text: 'AppInner',
                        items: [
                            { text: 'MiniApp', link: '/FE-Framework/MiniApp/' }
                        ]
                    }
                ]
            },
            {
                text: 'Build',
                items: [
                    { text: 'Webpack', link: '/Build/Webpack/' },
                    { text: 'Git', link: '/Build/Git/' },
                    { text: 'Test', link: '/Build/Test/' }
                ]
            },
            {
                text: 'Tools',
                items: [
                    { text: 'Vscode', link: '/Tools/Vscode/' },
                    { text: 'Vuepress', link: '/Tools/Vuepress/' },
                    { text: 'Markdown', link: '/Tools/Markdown/' }
                ]
            },
            { text: 'Network', link: '/Network/' },
            { text: 'Node', link: '/Node/' },
            {
                text: 'BE-Framework',
                items: [
                    { text: 'Express', link: '/BE-Framework/Express/' },
                    { text: 'Koa', link: '/BE-Framework/Koa/' }
                ]
            }
        ],

        sidebar: {
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
            ]
        }
    }
}
