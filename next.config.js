/* eslint-disable */
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const lessToJS = require('less-vars-to-js')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './utils/globalTheme.less'), 'utf8')
)

module.exports = withCss(withLess({
    cssLoaderOptions:{
        localIdentName: "[folder]_[local]_[hash:base64:5]",
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
        // localIdentName: "[folder]_[local]_[hash:base64:5]", //设置less的无效，在cssloaderOptions里面设置才有效
    },
    webpack: (config, { isServer, defaultLoaders, dev }) => {

        /*------ Antd with less and css-moudle ---------*/
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals]
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback()
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ]

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }

        config.module.rules.forEach(rule => {
            if (rule["test"] && rule["test"].test(".less")) {
                // console.log("less", rule, rule.use)
                rule.exclude = /node_modules/
            }
        });

        config.module.rules.push({
            test: /\.less$/,
            include: /node_modules/,
            use: cssLoaderConfig(config, {
                extensions: ['less'],
                cssModules: false,
                cssLoaderOptions: {},
                dev,
                isServer,
                loaders: [
                    {
                        loader: 'less-loader',
                        options: {
                            ...defaultLoaders.less.lessLoaderOptions,
                            javascriptEnabled: true,
                            modifyVars: themeVariables
                        }, // 全局less变量 themeVariables
                    },
                ],
            }),
        });
        /*------ Antd with less and css-moudle END ---------*/

        config.resolve.alias = {
            ...config.resolve.alias,
            "@utils": path.resolve(__dirname, "./utils"),
            "@globalTheme": path.resolve(__dirname, "./utils/globalTheme.less"),
            "@customHooks": path.resolve(__dirname, "./customHooks")
        }
        return config
    },
    cssModules: true,
}))
