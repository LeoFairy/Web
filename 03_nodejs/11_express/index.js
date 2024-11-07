const express = require("express")
const path = require("path")

//实现 自动监视代码修改，   修改后自动重启服务器 nodemon
/* 使用方式： 
      -1.全局安装 
        npm i nodemon -g
        yarn global add nodemon 
       启动：
       nodemon //运行index.js
       nodemon xxx  // 运行指定的js
       
       */

//创建服务器的实例
const app = express()

//设置中间路由， 将static当中的内容 显式出去 （配置静态资源的路径）
app.use(express.static(path.resolve(__dirname, "./public")))

//引入解析请求体的中间件  express.urlencoded
app.use(express.urlencoded())

//配置路由
app.get("/hello", (req, res) => {
  res.send("这是hello路由哦~~")
})

app.get("/login", (req, res) => {
  //通过req拿到请求的内容
  console.log("请求已经收到~ ");

  //req.query 能够查询字符串种的请求参数 
  if (req.query.username === "admin" && req.query.password === "123") {
    res.send("<h1>登录成功</h1>")
  } else {
    res.send("<h1>用户名或者密码错误</h1>")
  }
})

app.post("/login", (req, res) => {

  //通过req.body来获取post请求的参数 
  //默认情况下， express不会自动解析请求体，需要通过中间件来增加功能
  // console.log(req.body);

  const username = req.body.username
  const password = req.body.password
  if (username === "admin" && password === "123") {
    res.send("<h1>post登录成功了哦~</h1>")
  } else {
    res.send("<h1>用户名或者密码错误</h1>")
  }

})


app.post("/register", (req, res) => {
  //获取用户输入的数据
  // console.log(req.body);

  //对取到的内容直接解构
  const { username, password, repwd, nickname } = req.body
  // console.log(username, password, repwd, nickname)

  //验证这些数据是否正确，  略
  //验证用户名是否存在 
  const user = USERES.find(item => {
    return item.username === username || item.nickname === nickname
  })

  if (!user) {
    USERS.push({
      username,
      password,
      nickname
    })
    res.send(<h1>恭喜你，注册成功！</h1>)
  } else {

    res.send(<h1>用户名已存在</h1>)
  }

})
//启动服务器
app.listen(3000, () => {
  console.log("服务器已经启动了哦 ");
})