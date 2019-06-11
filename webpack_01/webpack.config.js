//默认配置文件名
//webpack是由node写出来的
let path = require("path");

//plugin需要被引入，引入的是一个类，使用的时候需要实例化，
let HtmlWebpackPlugin = require('html-webpack-plugin'); //复制html
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
//下面两个是生产环境下想要得到压缩的css配置，以及保证js也能够压缩
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let Webpack = require('webpack');

console.log('__dirname',__dirname);  
//__dirname,是一个变量，可以获得当前执行文件所在目录的完整目录名
//在当前位置他的值就是E:\work\demo\webpack_dev\webpack_01

module.exports = {
    optimization: {   //优化项
        minimizer: [
            new TerserJSPlugin({}),   //js压缩
            new OptimizeCSSAssetsPlugin({})],  //css压缩
      },
    devServer:{   //开发服务器的配置
        port:3000,
        progress:true, //内存中打包的时候会出现进度条
        contentBase:'./build',//指定静态服务的目录
        compress:true  //压缩
    },
    mode: 'development',   //打包模式，默认两种 production development
    entry:'./src/index.js',  //打包入口
    output:{
        filename:'bundle.js', //默认是main.js
        path : path.resolve(__dirname,'build') //打包文件放置的路径，默认放在./dist文件夹下
        //路径必须是一个绝对路径，这里利用node核心模块path，将相对路径转化成绝对路径
    },
    externals: { 
        jquery:'$'
    },
    plugins:[  //放置所有的webpack插件
        new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
            template: './src/index.html',
            filename: 'index.html',
            hash:true, //添加hash值解决缓存问题
            // minify: { // 对打包的html模板进行压缩
            //     removeAttributeQuotes: true, // 删除属性双引号
            //     collapseWhitespace: true // 折叠空行变成一行
            //   }
        }),
        new MiniCssExtractPlugin({
            filename:'style/main.css'
        }),
        // new Webpack.ProvidePlugin({
        //     $:'jquery' 
        //     //在每个模块中注入$,这样就不用在模块中使用import来引入了
        //     //但是这样的注入是没有暴露在全局，所以在window.$取不到
        // })
    ],
    module:{
        rules:[
            // 每个loader 功能单一
            // 多个loader 需要 []
            // 顺序默认从右到左
            // 也可以写成对象方式，这样一来方便传入其他参数

            // {
            //     test:require.resolve('jquery'),
            //     //使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名
            //     use:'expose-loader?$'
            //     //全局暴露jquery为$符号
            //     //使用插件在每一个模块中注入$是另一种方法
            // },
            {
                test: /\.css$/,  //处理css文件
                // use:'style-loader'  //只有一个loader的时候
                // style-loader 用来将样式插入到模板中的style标签中
                use:[
                    // {
                    //     loader:'style-loader',
                    //     options:{
                    //         // insertAt:"top" //将css插入在head标签的最顶头的位置，这样可以防止自定义style被覆盖
                    //     }
                    // }, 
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // css-loader 用来解析@import这种语法
                    'postcss-loader'  //给新的css属性加上前缀,为啥没有实现???
                ]
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env' //支持转换ES6以及更新的js语法
                        ],
                        plugins:[
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                },
                exclude:/node_modules/,
                include:path.resolve(__dirname,'src')
            }
        ]
    }
}