const express = require("express")
const path = require("path")
const app = express()


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

//使路由生效
app.use("/user", userRouter)
app.use("/goods", goodsRouter)
app.use("/students", require("./routes/student"))


app.use((req, res) => {
  res.status(404).send("<h1>您访问的内容已经被外星人劫走</h1>")
})




app.listen(3000, () => {
  console.log("服务器已经启动~");
})