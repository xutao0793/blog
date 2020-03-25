module.exports = {
  '/FE-Language/HTML/HTML/': [
    '',
    {
      title: '',
      collapsable: false,
      children: [
        '1-intro-grammar',
        '2-element-content-model',
        '3-doc-structure',
        '4-doctype',
        '5-html',
        '6-head',
        '7-body',
        '8-layout-structural-semantics',
        '9-text-structural-semantics',
        '10-text-content-semantics',
        '11-a',
        '12-img',
        '13-table',
        '14-form'
      ]
    },
  ],
  '/FE-Language/ES/': [
    '',
    {
      title: '前言',
      collapsable: false,
      children: [
        'Software',
        'ES_history',
      ]
    },
    {
      title: '基本语法',
      collapsable: false,
      children: [
        'BasicGrammar',
        'ExprAndOperators',
        'Statement',
        'StrictMode',
      ]
    },
    {
      title: '数据类型',
      collapsable: false,
      children: [
        'type-0-index',
        'type-7-checking',
        'type-8-primitive-wrapper',
        'type-9-conversion',
        'type-1-null-undefined-boolean',
        'type-2-number',
        'type-3-string',
        'type-4-symbol',
        'type-5-bigInt',
        'type-6-object',
      ]
    },
    {
      title: '面向对象',
      collapsable: false,
      children: [
        'oop-0-index',
        'oop-1-object-create',
        'oop-2-object-property',
        'oop-3-prototype',
        'oop-4-constructor',
        'oop-5-class',
      ]
    },
    {
      title: '函数 Function',
      collapsable: false,
      children: [
        'fn-0-index',
        'fn-1-intro',
        'fn-2-base',
        'fn-3-runtime',
        'fn-4-senior',
      ]
    },
    {
      title: '数据集合',
      collapsable: false,
      children: [
        'Array',
        'Map',
        'Set',
      ]
    },
    {
      title: '异步编程',
      collapsable: false,
      children: [
        'AsyncProgram',
        'ESModule',
      ]
    },
    {
      title: '其它',
      collapsable: false,
      children: [
        'ProgranStandard',
        'ESNextApi',
      ]
    }
  ],
  'FE-Language/TS/': [
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
  ],
  '/Browser/DOM/': [
    '',
    {
      title: '',
      collapsable: false,
      children: [
        'Node',
        'Document',
        'Element',
        'Text',
        'Dom_Style',
        'Dom_Event'
      ]
    }
  ],
  '/Browser/Render/': [
    '',
    {
      title: '',
      collapsable: false,
      children: [
        'intro',
        'structure',
        'cache',
        'render',
        'v8',
        'js_execute',
        'stack_heap_GC',
      ]
    }
  ],
  '/Browser/MISC/': [
    '',
    {
      title: '',
      collapsable: false,
      children: [
        'Blob-File-ArrayBuffer-URL'
      ]
    }
  ],
  '/FE-Framework/Vue/': [
    '',
    {
      title: 'Vue 基础',
      collapsable: false,
      children: [
        'vue-1-whyusevue-vue-jquery',
        'vue-2-template-directive',
        'vue-3-template-插值-v-html',
        'vue-4-template-v-if-and-v-show',
        'vue-5-template-v-for',
        'vue-6-template-v-bind',
        'vue-7-template-v-bind-with-class-and-style',
        'vue-8-template-v-on-and-modifier',
        'vue-9-template-v-model',
        'vue-10-template-ref',
        'vue-11-vue-scope',
        'vue-12-js-nextTick',
        'vue-13-template-render-JSX',
        'vue-14-js-vue-options',
        'vue-15-js-data',
        'vue-16-js-computed',
        'vue-17-js-methods',
        'vue-18-js-watch',
        'vue-19-js-filters',
        'vue-20-js-data-computed-watch-methods-filters',
        'vue-21-js-mixins',
        'vue-22-js-directive',
        'vue-23-js-lifeCycle_hooks',
      ]
    },
    {
      title: 'Vue 组件',
      collapsable: false,
      children: [
        'vue-24-component',
        'vue-25-component-introduce',
        'vue-26-component-prop',
        'vue-27-component-event',
        'vue-28-component-.native-.sync-model',
        'vue-29-component-slot',
        'vue-30-component-组件实例的引用',
        'vue-31-component-组件间通信6种方法',
        'vue-32-component-异步组件-工厂函数',
        'vue-33-component-内置组件transition',
        'vue-34-component-内置组件keep-alive',
        'vue-35-component-动态组件component',
      ]
    },
    {
      title: 'Vue 技术栈',
      collapsable: false,
      children: [
        'vue-37-router-index',
        'vue-38-router-前端路由历史',
        'vue-39-router-基本使用',
        'vue-40-vuex',
        'vue-41-vuex-state-getter-mutation-action',
      ]
    },
    {
      title: 'Vue 原理深入',
      collapsable: false,
      children: [
        'reactive-vue2'
      ]
    },
    {
      title: '其它',
      collapsable: false,
      children: [
        'HTML5_template',
        'outerHTML-innerTHML-outerText-innerText-textContent',
        'JS-callback-Promise-Generator-Async'
      ]
    },
  ],
  '/FE-Framework/React/': [
    '',
    {
      title: 'React 基础',
      collapsable: false,
      children: [
        'react-01-what_is_react',
        'react-02-React.createElement',
        'react-03-组件类 class Name extends React.Component',
        'react-04-组件属性传递props',
        'react-05-组件嵌套props.children',
        'react-06-组件属性默认值defaultProps',
        'react-07-组件属性值类型校验propsTypes',
        'react-08-组件状态state',
        'react-09-有状态组件和无状态组件',
        'react-10-组件的事件',
        'react-11-react事件内幕SyntheticEvent',
        'react-12-组件生命周期lifycycle',
        'react-13-JSX体验',
        'react-14-JSX语法',
        'react-15-React使用表单',
        'react-16-高阶组件HOC',
        'react-17-创建React项目的三种方法',
      ]
    },
    {
      title: 'React 技术栈',
      collapsable: false,
      children: [
        'react-cli', 
        'react-router-01-路由react-router原理',
        'react-router-02-React-Router-v4',
        'react-router-03-路由react-router的API',
        'react-redux-01-what_is_Redux',
        'react-redux-02-React-Redux'
      ]
    },
    {
      title: 'React Hooks',
      collapsable: false,
      children: ['react-hooks']
    }
  ],
  '/FE-Engineering/Webpack/': [
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
  '/FE-Engineering/Git/': [
    '',
    {
      title: '',
      collapsable: false,
      children: ['InitGit', 'UseGit']
    }
  ],
  '/FE-Engineering/Doc/':[
    '',
    {
      title: '',
      collapsable: false,
      children: ['Vuepress', 'Markdown']
    }
  ],
  '/FE-Engineering/Api/':[
    '',
    {
      title: '',
      collapsable: false,
      children: ['Restful', 'GraphQL']
    }
  ],
  '/FE-Engineering/Lint/':[
    '',
    {
      title: '',
      collapsable: false,
      children: ['eslint', 'jslint']
    }
  ],
  '/Network/HTTP/': [
    '',
    {
      title: '',
      collapsable: false,
      children: ['introduce','URI_MIME','session_connect_message','httpCache','httpCookie','httpCORS','httpAuth']
    }
  ],
  '/BE-Framework/Node/': [
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
      children: ['buffer', 'stream', 'path', 'fs','bit-byte-stream-buffer']
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
  '/Misc/': [
    '',
    {
      title: '',
      collapsable: false,
      children: ['InitDevEnv', 'tree-node-cli']
    }
  ],
}
