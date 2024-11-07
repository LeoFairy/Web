//先要引用

//引入两个核心模块 path 和fs
const path = require("node:path")
// const fs = require("node:fs")
const { promiseHooks } = require("node:v8")

//获取当前工作目录的绝对路径
// path.resolve(__dirname, "./hello.txt")


//readFileSync()  同步的读取文件方法
/* const buf = fs.readFileSync(path.resolve(__dirname, "./hello.txt"))
// console.log(buf);
// 将buf 转换为字符串
console.log(buf.toString()); */


//readFile()   异步的读取文件方法
/* fs.readFile(path.resolve(__dirname, "./hello.txt"),
  (err, buffer) => {
    if (err) {
      console.log("出错了");
    } else {
      console.log(buffer.toString());
    }
  }
)
 */


// promise版本的readFile()
/* const fs = require("node:fs/promises")
 
fs.readFile(path.resolve(__dirname, "./hello.txt"))
  .then(buffer => {
    console.log(buffer.toString());
  })
  .catch(e => {
    console.log("出错了 ");
  }) */


const fs = require("node:fs/promises")
  //async版本的readFile()
  ; (async () => {

    try {
      const buffer = await fs.readFile(path.resolve(__dirname, "./hello.txt"))
      console.log(buffer.toString());
    } catch (e) {
      console.log("出错了");

    }
  })()