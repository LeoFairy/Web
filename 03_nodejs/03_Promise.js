function sum(a, b) {
  return new Promise((resolve, reject) => {
    //直接放原本想放的代码 ，  然后返回数据时用 resolve 去存就好
    setTimeout(() => {
      // return a+b
      resolve(a + b)
    }, 1000)
  })
}

//sum(123,456)之后就是一个promise对象， 所以要拿到数据就直接then方法
// sum(123, 456).then((result) => {
//   console.log(result);
// })


//promise:
sum(123, 456)
  .then(result => result + 7)
  .then(result => result + 8)
  .then(result => console.log(result))
