const express = require("express")
const router = express.Router()
let STUDENT_ARR = require("../data/students.json")
const fs = require("fs/promises")
const path = require("path")
//引入uuid
const uuid = require("uuid").v4

router.use((req, res, next) => {
  //获取一个请求头referer
  const referer = req.get("referer")
  console.log("请求来自：", referer);

  if (!referer || !referer.startsWith("http://localhost:3000/")) {
    res.status(403).send("你没有权限")
    return
  }

  // console.log(req.session.loginUser);
  if (req.session.loginUser) {
    next()
  } else {
    res.redirect("/")
  }
})

//学生列表路由
router.get("/list", (req, res) => {
  /*   console.log(req.session);
    if (req.session.loginUser) {
      res.render("students", { stus: STUDENT_ARR })
  
    } else {
      res.redirect("/")
    } */

  //生成一个token
  const csrfToken = uuid()
  //将token添加到session中去 
  req.session.csrfToken = csrfToken
  req.session.save(() => {
    res.render("students", { stus: STUDENT_ARR, username: req.session.loginUser, csrfToken })

  })
})

//添加学生的路由
router.post("/add", (req, res, next) => {
  //客户端发送的token
  const csrfToken = req.body._csrf
  const sessionToken = req.session.csrfToken
  // 取完session中的token就清空  （一次性的）
  req.session.csrfToken = null
  //将客户端的token和session中的token进行比较
  if (req.session.csrfToken === csrfToken) {

    //1.获取用户填写的信息
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1

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

    req.session.save(() => {
      //4. 返回响应

      //将新的数据写入到json文件中
      //调用next（）  交由后续路由继续处理
      next()
    })

  } else {
    res.status(403).send("token错误")
  }


})

//删除学生的路由 

router.get("/delete", (req, res, next) => {
  const id = +req.query.id    // 返回来的是字符串 ，要用+号 
  console.log(id);
  //根据id删除学生
  STUDENT_ARR = STUDENT_ARR.filter((students) => students.id !== id)

  //将新的数据写入到json文件中
  next()

})

//修改学生信息
router.get("/to-update", (req, res) => {
  const id = +req.query.id
  //获取要修改的学生信息
  const student = STUDENT_ARR.find(item => item.id === id)
  console.log(student);
  res.render("update", { student })
})

router.post("/update-student", (req, res, next) => {
  const id = +req.query.id
  const { name, age, gender, address } = req.body
  // console.log(name);
  //修改学生信息 
  //根据学生id获取学生对象
  const student = STUDENT_ARR.find(item => item.id === id)
  student.name = name
  student.age = +age
  student.gender = gender
  student.address = address


})

//处理存储文件的路由
//  
router.use((req, res) => {
  fs.writeFile(
    path.resolve(__dirname, "../data/students.json"),
    JSON.stringify(STUDENT_ARR)
  ).then(() => {
    //写入成功后进行重定向

    // res.send("添加成功")
    //直接在添加路由中熏染ejs，会面临表单重复提交的问题
    // res.render("students", { stu: STUDENT_ARR })

    //res.redirect()用来发起请求重定向
    //重定向的作用是告诉浏览器你向另外一个地址再发起请求
    res.redirect("/students/list")
  }).catch(() => {
    res.send("操作失败")
  })
})

module.exports = router