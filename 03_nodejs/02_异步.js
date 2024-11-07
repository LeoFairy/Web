// 异步 （settimeout会在页面所有代码执行完之后执行的 ，能实现异步的效果）  异步取不到结果
/* function sum(a, b) {
  setTimeout(() => {
    return a + b
  }, 2000)
}

console.log(111);
const result = sum(123, 456)
console.log(result);
console.log(222); */


// 异步取结果要用回调：  在函数后面新增一个参数，这个参数为回调函数，
//把函数的结果用 回调函数接着。 再在回调函数内部写需要干的事情
/* function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  }, 3000)
}

console.log(1111);
sum(123, 456, (result) => {
  console.log(result);
})

console.log(22222);
 */


//如果异步的结果还要拿来继续使用， 就在回调函数里面再用回调函数

function sum(a, b, cb) {
  setTimeout(() => {
    cb(a + b)
  }, 3000)
}

/* console.log(1111);
sum(123, 456, (result) => {
  sum(result, 7, (result2) => {
    console.log('123+456+7的结果为：');
    console.log(result2);
    sum(result, 8, (result) => {
      // 这里写的是result  此时result的结果是 123+456    之前123+456+7的结果返回到了 result2中
      console.log(result);
    })
  })
})

console.log(22222); */


//会出现回调地狱  所以需要引出promise去解决
console.log(1111);
sum(123, 456, (result) => {
  sum(result, 7, (result) => {
    console.log('123+456+7的结果为：');
    console.log(result);
    sum(result, 8, (result) => {
      console.log('123+456+7+8的结果为：');
      console.log(result);
      sum(result, 9, (result) => {
        sum(result, 10, (result) => {
          console.log(result);   // 回调地狱
        })
      })
    })
  })
})

console.log(22222);




