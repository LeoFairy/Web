const express = require("express")
const app = express()
const jwt = express("jsonwebtoken")

const STU_ARR = [
  { id: "1", name: "孙悟空", age: "18", gender: "男", address: "花果山" },
  { id: "2", name: "猪八戒", age: "20", gender: "男", address: "高老庄" },
  { id: "3", name: "沙和尚", age: "32", gender: "男", address: "流沙河" }

]
//解析请求体的中间件
app.use(express.urlencoded({ extended: true }))
//解析json格式请求体的中间件
app.use(express.json())

app.use((req, res, next) => {
  //设置响应头
  //Access-Control-Allow-Origin 设置指定值时只能设置一个
  res.setHeader("Access-Control-Allow-Origin", "*") // 允许所有人
  res.setHeader("Access-Control-Allow-Method", "GET,POST,PUT,DELETE,PATCH")
  res.setHeader("Access-Control-Allow-Headers", "Content-type ,Authorization")
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")

  /*
  Access-Control-Allow-Methods 允许请求的方式
  Access-Control-Allow-Headers 允许传递的请求头*/
  next()
})

app.get("/test", (req, res) => {

})

//定义一个登录的路由
app.post("/login", (req, res) => {
  //获取用户名和密码
  const { username, password } = req.body

  if (username === "admin" && password === "123123") {
    //登录成功，生成token
    const token = jwt.sign({
      id: "12345", username: "admin", nickname: "超级管理员"
    }, "chaojianquanmima", {
      expiresIn: "1d"
    })

    res.send({
      status: "ok",
      data: {
        token,
        nickname: "超级管理员",
      }
    })
  } else {
    res.status(403).send({
      status: "error",
      data: " 用户名或者密码错误~"
    })
  }
})

//定义学生信息相关路由 
app.get("/students", (req, res) => {
  console.log("收到students的get请求");


  try {
    //这个路由必须在用户登录的时候才可以访问，  检查用户是否登录
    //读取请求头  Bearer xxxx(token)
    //将字符串根据空格进行拆分， 会得到两个字符串， 选第二个字符串 也就是xx[1] 为token的内容
    const token = req.get("Authorization").split(" ")[1]
    //对token进行解码
    const decodeToken = jwt.verify(token, "chaojianquanmima")
    console.log(decodeToken)
    //解码成功，token有效

    //返回学生信息
    res.send({
      status: "ok",
      data: STU_ARR
    })
  } catch (e) {
    //解码错误
    res.status(403).send({
      status: "error",
      data: "token无效"
    })
  }

})

//定义一个添加
app.post("/students", (req, res) => {
  console.log("收到students的post请求", req.body);
  // 获取学生信息
  const { name, age, gender, address } = req.body
  //创建学生信息
  const stu = {
    id: +STU_ARR.at(-1).id + 1 + "",//取最后一个加 1然后再转换为字符串
    name,
    age: +age,
    gender,
    address
  }
  //将学生信息添加到
  STU_ARR.push(stu)

  //添加成功
  res.send({
    status: "ok",
    data: stu
  })
})

//查询某个学生的路由 根据id
app.get("/students/:id", (req, res) => {

  const id = req.params.id
  const stu = STU_ARR.find(item => item.id === id)
  //将数据返回
  res.send({
    status: "ok",
    data: stu
  })
})

//定义一个删除学生的路由,根据id删除
app.delete("/students/:id", (req, res) => {
  const id = req.params.id
  //遍历数组
  for (let i = 0; i < STU_ARR.length; i++) {
    if (STU_ARR[i].id === id) {
      const delStu = STU_ARR[i]
      STU_ARR.splice(i, 1)  // 从数组中的第i个位置开始删除，删一个 
      //数据删除成功
      res.send({
        status: "ok",
        data: delStu
      })
      return
    }
  }
  //如果执行到这，说明查询此id的学生不存在
  res.status(403).send({
    status: "error",
    data: "学生id不存在"
  })
})

// 定义一个修改学生的路由
/*  第一种方法  ， 跟查询类似， 传入一个id 根据id来修改
  app.put("/students/:id", (req, res) => {
  
})
 */
//方法二：
app.put("/students", (req, res) => {
  //获取数据
  const { id, name, age, gender, address } = req.body

  //根据id查询学生
  const updateStu = STU_ARR.find(item => item.id === id)

  //学生可能不存在
  if (updateStu) {
    updateStu.name = name
    updateStu.age = age
    updateStu.gender = gender
    updateStu.address = address

    res.send({
      status: "ok",
      data: updateStu
    })
  } else {
    res.status.send({
      status: "error",
      data: "学生id不存在"
    })
  }
})

app.listen(3000, () => {
  console.log("服务器已经启动啦~ ");
})