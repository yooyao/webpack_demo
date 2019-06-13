let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    //多入口，此时的entry就不再是string，而是写成一个对象
    entry:{
        home: './src/index.js',
        other: './src/other.js'
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    devServer:{   //开发服务器的配置
        // contentBase:'./dist',//指定静态服务的目录
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            }            
        ]
    },
    //增加源码映射，帮助我们调试代码，定位错误
    //1.source-map 源码映射文件，会把每个js文件单独生成一个.js.map文件，打包运行的代码出错之后会被标志出当前报错的列和行
    //devtool:'source-map', 
    //2.eval-source-map,不会产生单独文件，但是可以显示行和列
    // devtool:'eval-source-map',
    //3.不会显示
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',  //这里写成index.html,开启webpack-dev-server服务会自动以index.html作为首页打开？？why
            chunks:['home']   //代码块，引入需要插入的js模块
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'other.html'  //如果不在chunks中指定代码块的话，所有打包出来的js都会被引入
        })
    ]
}