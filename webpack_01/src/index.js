import  './style/index.css';
import $ from 'jquery';
// import $ from 'expose-loader?$!jquery'; //内联loader，使用expose-loader 暴露全局变量的loader
// 这里也可以把loader的配置写在 webpack.config 中，也就是普通的loader写法，见webpack.config.js

//在webpack中引入图片
//1. 在js中创建图片来引入
import img0 from './image/img0.png';
//直接在src中赋值图片资源路径是不能被webpack打包的
//需要使用 import或者require语法将资源引入
//file-loader 会默认生成一张图片到build目录中,打包成一个名为hash戳的图片文件
let image = new Image();
image.src = img0;
document.body.appendChild(image);

//测试全局变量和变量注入模块的时候使用
// console.log(window.$)   
// console.log($)

//测试babel
// let a=require("./a.js");
// console.log(a);

// let fun1 = ()=>{
//     console.log('this is fun1')
// }

// fun1();

// class A{     
//     a="a1";
// }
// let AA =new A();
// console.log(AA.a);