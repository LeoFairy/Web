const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")


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
//使路由生效
// app.use("/user", userRouter)
// app.use("/goods", goodsRouter)
app.use("/students", require("./routes/student"))

app.get("/", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  //获取用户的用户米和密码
  const { username, password } = req.body
  console.log(username, password);
  if (username === "admin" && password === "123123") {
    // res.send("登录成功")

    //将用户名放入cookie
    res.cookie("username", username)
    res.redirect("/students/list")
  } else {
    console.log("用户名或者密码错误");
    res.send("用户名或者密码错误")
  }
})

app.get("/get-cookie", (req, res) => {
  res.cookie("username", "admin") //cookie的内容也是键值对的形式
  res.send("cookie已经发送")
})

app.get("/hello", (req, res) => {
  /*   需要安装中间件使express可以解析cookie   
      1.安装cookie-parser 
        yarn add cookie-parser
      2. 引入
      const cookieParser = require("cookie-parser")
      3. 设置为中间件 
      app.use(cookieParser)

      */
  //通过req.cookie来读取客户端发回的cookie
  console.log(req.cookies);

  res.send("hello路由")
})

app.use((req, res) => {
  res.status(404).send("<h1>您访问的内容已经被外星人劫走</h1>")
})




app.listen(3000, () => {
  console.log("服务器已经启动~");
})