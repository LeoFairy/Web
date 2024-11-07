

const result = require("./m6.js")


//如果只想引进来其中的一个属性：
// 方法1：
// const name = require("./06_mokuaihua.js").name

//方法二： 解构
const { name } = require("./m6.js")



console.log(result);
console.log(name);
