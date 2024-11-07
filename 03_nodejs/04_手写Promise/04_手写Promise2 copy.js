const PROMISE_STATE = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2

}


class myPromise {
  #result
  #state = 0
  #callback
  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this))//调用回调函数 
  }

  #resolve(value) {
    console.log("resolve被调用了，value值是：", value);
    if (this.#state !== PROMISE_STATE.PENDING) return
    this.#result = value
    this.#state = PROMISE_STATE.FULFILLED
    //相当于 onFulfilled(value)
    this.#callback && this.#callback(this.#result)
  }
  #reject(reason) { }
  then(onFulfilled, onRejected) {
    if (this.#state === PROMISE_STATE.PENDING) {
      this.#callback = onFulfilled
    } else if (this.#state === PROMISE_STATE.FULFILLED) {
      onFulfilled(this.#result)
    }
  }
}

const mp = new myPromise((resolve, reject) => {
  resolve("存储的数据")
})
console.log(mp);

mp.then(result => {
  console.log("读取的结果为:", result);
})