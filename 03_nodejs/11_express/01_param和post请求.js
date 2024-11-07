const express = require("express")
const path = require("path")

//创建服务器的实例
const app = express()


const USERS = [
  {
    username: "admin",
    password: "123123",
    nickname: "超级管理员"
  }, {
    username: "sun",
    password: "123456",
    nickname: "齐天大圣"
  }
]
//设置中间路由， 将static当中的内容 显式出去 （配置静态资源的路径）
app.use(express.static(path.resolve(__dirname, "./public")))

//引入解析请求体的中间件  express.urlencoded
app.use(express.urlencoded())



app.post("/login", (req, res) => {

  //通过req.body来获取post请求的参数 
  //默认情况下， express不会自动解析请求体，需要通过中间件来增加功能
  console.log(req.body);

  const username = req.body.username
  const password = req.body.password

  /*   //获取到用户的用户名和密码后， 需要根据用户名去用户的数组中查询 
    for (const user of USERS) {
      // console.log(user);
      if (user.username === username) {
        if (user.password === password) {
          res.send(`<h1>${user.nickname}post登录成功了哦~</h1>`)
          return
        }
        res.send("<h1>用户名或者密码错误</h1>")
      }
   */

  const loginUser = USERS.find((item) => {
    return item.username === username && item.password === password
  })

  if (loginUser) {
    res.send(`<h1>${loginUser.nickname}post登录成功了哦~</h1>`)
  } else {
    res.send("<h1>用户名或者密码错误</h1>")
  }



  /*   if (username === "admin" && password === "123") {
      res.send("<h1>post登录成功了哦~</h1>")
    } else {
      res.send("<h1>用户名或者密码错误</h1>")
    } */

})



//启动服务器
app.listen(3000, () => {
  console.log("服务器已经启动了哦 ");
})


