import  './style/index.css';
import $ from 'jquery';
// import $ from 'expose-loader?$!jquery'; //内联loader，使用expose-loader 暴露全局变量的loader
// 这里也可以把loader的配置写在 webpack.config 中，也就是普通的loader写法，见webpack.config.js
//loader有几种类型 pre前面执行的、normal普通的、内联的、post后置的

console.log(window.$)   
//直接import $ from 'jquery'，会输出undefined，$不会被暴露在全局
//因为在打包的时候会把文件都封装在一个闭包中，这样就不会被直接挂载到全局
//
console.log($)

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