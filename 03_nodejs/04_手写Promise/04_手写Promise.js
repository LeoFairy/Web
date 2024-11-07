const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2

}


class myPromise {
  //创建一个变量用来存储promise的结果
  #result

  //创建一个变量来记录promise的状态
  #state = 0  //pending 0   fulfilled  1  rejected  2
  //设置一个构造器 
  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this))//调用回调函数 
  }


  //带#表示 私有方法
  #resolve(value) {
    console.log("resolve被调用了，value值是：", value);
    //还需要把结果存进去

    //不可以用this
    // 如果这么用的话 this的指向是调用函数的人 ，而在调用时 话语为： resolve("存储的数据")  ，前面没有定义 
    //所以此时this的值是 undefined   。  
    // this.#result =value  

    // 故要改变this的指向    在构造器里的加上bind  锁死this的值

    //需要禁止promise的第二次修改
    if (this.#state !== PROMISE_STATE.PENDING) return


    this.#result = value
    this.#state = PROMISE_STATE.FULFILLED
  }

  #reject(reason) { }

  //添加一个用来读取数据的then方法
  then(onFulfilled, onRejected) {
    if (this.#state === PROMISE_STATE.FULFILLED) {

      //解决读取异步结果的问题 
      onFulfilled(this.#result)
    }

  }

}

//resolve是promise内部的  ， 而result是我们定义传过去的参数
const mp = new myPromise((resolve, reject) => {
  resolve("存储的数据")
  resolve("存储的数据2")
})

console.log(mp);
mp.then(result => {
  console.log("读取的结果为:", result);
})