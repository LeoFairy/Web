const express = require("express");
const app = express();

//next是回调函数的第三个参数，它是一个函数，调用后，可以触发下一个中间件



app.use((req, res, next) => {
  if (req.path === '/favicon.ico') {
    // 对于 /favicon.ico 的请求，直接返回 204 (No Content) 响应
    res.status(204).end();
    return;
  }
  console.log("11111收到请求...", Date.now());
  next();
});

app.use((req, res, next) => {
  console.log("22222收到请求...", Date.now());
  next();
});

app.use((req, res, next) => {
  console.log("333333收到请求...", Date.now());
  res.send("这是通过中间件返回的响应");
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已经启动~");
});
