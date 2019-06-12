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
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'home.html',
            chunks:['home']   //代码块，引入需要插入的js模块
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'other.html'  //如果不在chunks中指定代码块的话，所有打包出来的js都会被引入
        })
    ]
}