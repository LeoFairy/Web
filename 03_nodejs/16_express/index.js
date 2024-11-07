const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
//引入session
const session = require("express-session")

//引入file-store

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

//配置模版引擎为ejs
app.set("view engine", "ejs")
//配置模版引擎的路径 为当前项目的路径   
app.set("views", path.resolve(__dirname, "views"))
//配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))
//配置请求体的解析   (后面extended可写可不写 ，写了用终端运行时，少一行警告 )
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
//引入session的中间件
app.use(session({
  secret: "hello"   //数据加密的问题
}))

//使路由生效
// app.use("/user", userRouter)
// app.use("/goods", goodsRouter)
app.use("/students", require("./routes/student"))




app.get("/set", (req, res) => {

  //req中会多出一个session属性
  // console.log(session);
  req.session.username = "sunwokong"
  res.send("设置cookie")
})

app.get("/get", (req, res) => {
  const username = req.cookies.username
  console.log(username);
  res.send("读取cookie")
})


app.get("/", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  //获取用户的用户米和密码
  const { username, password } = req.body
  console.log(username, password)
  if (username === "admin" && password === "123123") {
    // res.send("登录成功")
    //登录成功后，将用户信息放入到session中
    console.log("账号密码正确！！")
    console.log(req.session)
    req.session.loginUser = username
    res.redirect("/students/list")
  } else {
    res.send("用户名或者密码错误")
  }
})



app.use((req, res) => {
  res.status(404).send("<h1>您访问的内容已经被外星人劫走</h1>")
})

app.listen(3000, () => {
  console.log("服务器已经启动~");
})