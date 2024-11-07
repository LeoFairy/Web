/* 
  使用步骤
  1. 创建并初始化项目：  yarn init -y
  2。 安装express    yarn add express
 3.   创建index.js 并编写代码
 */

//引入express
const express = require("express")

//获取服务器实例： （对象）
const app = express()

/* 如果希望服务器可以正常访问，则需要为服务器设置路由 
      路由可以根据不同的请求方式和请求地址来处理用户请求
      app.METHOD()
          METHOD可以是get 或post...


    中间件
        -使用app.use来定义一个中间件
          但是路由会检查请求 
          use 是所有请求都会运行的
      
*/

// 其中"/" 表示的是 http://localhost:3000
//路由的回调函数执行时， 会接收到三个参数  第一个request 第二个 response
/* app.get("/", (req, res) => {
  console.log("有人访问了~");
  // 在路由中 要做两件事
  //1. 读取用户的请求 (request)
  //req就是请求报文   读取用户的请求信息 
  console.log(req);
  //2. 根据用户的请求返回响应 （response）
  // 能够通过res来返回相应数据   
  // res.sendStatus(404)  //向客户端发送响应状态码
  res.status(200)//设置响应状态码 
  res.send("你的请求没问题，")
})
 */

//next是回调函数的第三个参数， 他是一个函数，调用后，可以出发触发的中间件
app.use((req, res, next) => {
  console.log("11111收到请求...", Date.now())
  // res.send("这是通过中间件返回的响应")
  next()
})

app.use((req, res, next) => {
  console.log("22222收到请求...", Date.now())
  // res.send("这是通过中间件返回的响应")
  next()
})
app.use((req, res, next) => {
  console.log("333333收到请求...", Date.now())
  res.send("这是通过中间件返回的响应")
})
//启动服务器


//服务器启动后，我们可以通过3000端口访问
//协议名：//ip地址：端口号(or路径)
//http://localhost:3000
//或者：  http://127.0.0.1:3000
app.listen(3000, () => {
  console.log("服务器已经启动~");
})