
//async 异步   可以快速创建异步函数
function fn() {
  return Promise.resolve(10)
}

// 异步函数的返回值会自动封装到一个promise中返回
async function fn2() {
  return 10
}

fn().then(r => console.log(r))

let result = fn2()

console.log(result);
fn2().then(r => console.log("async创建fn2的返回值为", r))

console.log("```````````````````````````````");


async function sum(a, b) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(a + b)
    }, 1000)
  })

}


//使用await 避免多次调用回调函数
async function fn3() {
  // sum(123, 456)
  //   .then(r => sum(r, 8))
  //   .then(r => sum(r, 9))
  //   .then(r => console.log("sum多次调用then之后的结果", r))

  //await 的作用 以同步的方式去编写异步代码， 让结构更加清晰 但仍然还是异步代 码
  try {

    let result = await sum(123, 456)
    result = await sum(result, 8)
    result = await sum(result, 9)

    console.log("使用await后的结果为：", result);
  } catch (e) {
    console.log("出错了~~~");
  }
}

fn3()