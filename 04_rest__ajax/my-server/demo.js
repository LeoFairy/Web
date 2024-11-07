//1.引入jwt
const jwt = require("jsonwebtoken")

//创建对象
const obj = {
  name: "swk",
  age: 12,
  gender: "男"
}

//使用jwt来对json数据加密
jwt.sign(obj, "hellohowareyou", {
  expiresIn: "1h" //有效时间。 一小时
})
console.log(token);

const decodeData = jwt.verify(token, "hellohowareyou")
console.log(decodeData);