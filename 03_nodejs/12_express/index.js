const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")
//读取json中的内容  复制给数组
const STUDENT_ARR = require("./data/students.json")
let name = "猪八戒"

//配置模版引擎为ejs
app.set("view engine", "ejs")
//配置模版引擎的路径 为当前项目的路径   
app.set("views", path.resolve(__dirname, "views"))

//配置静态资源路径
app.use(express.static(path.resolve(__dirname, "public")))
//配置请求体的解析   (后面extended可写可不写 ，写了用终端运行时，少一行警告 )
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

app.get("/hello", (req, res) => {
  res.send("hello")
})

app.get("/set_name", (req, res) => {
  name = req.query.name
  res.send("修改成功~")
})

app.get("/students", (req, res) => {
  //希望用户在访问students路由时，可以给用户返回一个有学生信息的页面

  //res.render() 用来渲染一个模版引擎，并将其返回给浏览器
  //可以将一个对象作为render的第二个对象
  res.render("students", { stus: STUDENT_ARR })
  // <%= %>在ejs中输出内容时，会自动对特殊字符进行转义 。  （也就是 在页面中会显示<h1>）  <会自动转换为 ： &lt;
  // 这个设计主要是为了避免xss攻击 
  // res.render("students", { hello: "<h1>哈哈哈</h1>" })

})
//创建一个添加学生信息的路由
app.post("/add-students", (req, res) => {
  //1.获取用户填写的信息
  const id = STUDENT_ARR.at(-1).id + 1

  // const newUser = req.body
  // 可能传过来的req 不只是我们需要的四个 ，所以最好还是单独赋值一下
  const newUser = {
    id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    address: req.body.address
  }
  //2. 验证用户信息   （略）
  //3. 将用户信息添加到数组中：
  STUDENT_ARR.push(newUser)

  //4. 返回响应

  //将新的数据写入到json文件中
  fs.writeFile(
    path.resolve(__dirname, "./data/students.json"),
    JSON.stringify(STUDENT_ARR)
  ).then(() => {
    //写入成功后进行重定向

    // res.send("添加成功")
    //直接在添加路由中熏染ejs，会面临表单重复提交的问题
    // res.render("students", { stu: STUDENT_ARR })

    //res.redirect()用来发起请求重定向
    //重定向的作用是告诉浏览器你向另外一个地址再发起请求
    res.redirect("/students")
  }).catch(() => {
    //...
  })




  // console.log(newUser);
})


//可以在所有路由后面配置错误路由
//优先级最低的， 但凡上面有一个匹配到了， 那么就不会通过这个路由
app.use((req, res) => {
  //只要这个中间件执行，说明上面都没匹配
  res.status(404)
  res.send("<h1>您访问的地址已被外星人劫持~</h1>")

})

app.listen(3000, () => {
  console.log("服务器已经启动~");
})