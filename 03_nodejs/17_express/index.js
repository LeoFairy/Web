const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
//引入session
const session = require("express-session")

//引入file-store
const FileStore = require("session-file-store")(session)

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
app.use(
  session({
    store: new FileStore({
      // path用来指定session本地文件的路径
      path: path.resolve(__dirname, "./sessions"),
      // 加密
      secret: "哈哈"
      // session的有效时间 秒 默认1个小时
      // ttl: 10,
      // 默认情况下，fileStore会每间隔一小时，清除一次session对象
      // reapInterval 用来指定清除session的间隔，单位秒，默认 1小时
      // reapInterval: 10
    }),
    secret: "hello"   //数据加密的问题
  })
)

//使路由生效
// app.use("/user", userRouter)
// app.use("/goods", goodsRouter)
app.use("/students", require("./routes/student"))


app.get("/", (req, res) => {
  /*   const token = uuid()
    console.log(token); */
  res.render("login")
})

app.get("/logout", (req, res) => {
  // 使session失效
  req.session.destroy(() => {
    res.redirect("/")
  })
})

app.get("/logout", (req, res) => {
  // 使session失效
  req.session.destroy(() => {
    res.redirect("/")
  })
})


app.post("/login", (req, res) => {
  //获取用户的用户米和密码
  const { username, password } = req.body
  console.log(username, password)
  if (username === "admin" && password === "123123") {
    // res.send("登录成功")
    //登录成功后，将用户信息放入到session中
    //这里是吧session放在了内存当中， 而没有存在文件中
    req.session.loginUser = username
    //
    req.session.save(() => {
      res.redirect("/students/list")
    })

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