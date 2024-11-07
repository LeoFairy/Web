
// 1. process.exit()
// console.log(111);

// process.exit()

// console.log(222);


//2. process.nextTick()

queueMicrotask(() => {
  console.log(1);
})

process.nextTick(() => {
  console.log(3);
})
setTimeout(() => {
  console.log(2);
}, 1000)

console.log(4);

//tick队列相当于是老板的微任务队里，  优先级大于微任务队列
