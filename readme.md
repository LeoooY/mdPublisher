## 开发指南

### 文档
- [nextjs](https://nextjs.org/docs/getting-started)
- [antd](https://ant.design/docs/react/introduce)
- [umi-request](https://github.com/umijs/umi-request)

### 项目模块
- [x] antd + less + css-moudle
配置期间有个很骚的地方，antd和css-moudle不能同时使用，
原因是next-less插件的css-moudle默认将所有less文件进行解析，而antd的样式文件在此阶段被污染了。解决思路是antd样式从node_module中引入的，对node_modle中的less文件不做css-moudle处理，解决方案见目录下的`next.confg.js`。
- [x] request封装: 直接用umi-request
- [x] 路径alias: 参考`next.confg.js`
- [ ] 文件上传