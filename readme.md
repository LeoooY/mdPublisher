## 开发指南

### 文档
- [nextjs](https://nextjs.org/docs/getting-started)
- [antd](https://ant.design/docs/react/introduce)
- [umi-request](https://github.com/umijs/umi-request)

### 项目模块
前端：
- [x] antd + less + css-moudle
配置期间有个很骚的地方，antd和css-moudle不能同时使用，
原因是next-less插件的css-moudle默认将所有less文件进行解析，而antd的样式文件在此阶段被污染了。解决思路是antd样式从node_module中引入的，对node_modle中的less文件不做css-moudle处理，解决方案见目录下的`next.confg.js`。
- [x] request封装: 直接用umi-request
- [x] 路径alias: 参考`next.confg.js`
- [ ] 文件上传
- [ ] useModal封装，三个按钮（新增、编辑、上传）功能基于useModal做开发
- [ ] md文件点击预览

后端：
- [ ] 上传文件接口逻辑处理
- [ ] 文件查询接口
- [ ] 排序（决定是前端排序还是后端排序）
