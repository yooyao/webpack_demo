module.exports = {aa:"this is a.js"};

class B{   //使用@babel/plugin-transform-runtime插件将公共的地方抽离出来

}

function *gen(){   //并且支持一些更高级的语法
    yield 11;
}
console.log(gen().next());