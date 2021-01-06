# 前端开发必不可少，什么是异步编程

由于 javascript 语言是一门“单线程”的语言，所以，javascript 就像一条流水线，仅仅是一条流水线而已，要么加工，要么包装，不能同时进行多个任务和流程。

而作为前端开发，在面试与工作中相信大家一定被问过或经常需要用到异步编程，那么什么是异步编程呢？

首先我们先区分一下什么是同步编程，什么是异步编程。

同步编程：我们都知道代码的执行顺序是自上而下执行的，那么同步就是需要每一个任务都完成以后再去执行下一个任务，执行顺序与排列顺序是一致的。坏处，只要有一个任务耗时很长，后面任务都必须排队等着，常见的浏览器无响应，死循环。

异步编程：每一个任务有一个或多个回调函数，前一个任务执行完后，不是执行下一个任务，而是执行回调函数，后一个任务是不等前一个任务结束就执行的，所以程序的执行顺序与任务的排列顺序是不一致的。

简单的说我们可以将异步编程理解为在约定的时间内完成的操作。

举个简单的例子：
假设你设置了一个第二天 7:00 的闹钟，那么我们设置完，是一直在等待闹钟的提醒，再去做下一件事，还是去做别的事情，相信大家都不会傻傻的在那等，在编程里这就异步编程。

异步编程怎么判断：是否阻塞 ? 同步阻塞 ，异步不阻塞。

那么常见的异步编程有什么呢？

- setTimeout
- Ajax
- Promise
- async 函数

接下来我们通过代码看看异步编程是如何执行的

#### 定时器(setTimeOut)

在规定的时间内完成操作： 点击按钮，会打印“我先执行” 接着打印 “执行定时器”。 可以看到虽然时间设置为 0，但是定时器里的任务并不是先被执行

```
<body>
    <button>点击触发定时器</button>
    <script>
        let btn = document.querySelector('button');
        btn.onclick = function () {
            setTimeout(function () {
                alert('执行定时器');
            }, 0)

        }
        console.log('我先执行');
    </script>
</body>
```

![setTimeout](https://note.youdao.com/favicon.ico)

#### Ajax (异步 JavaScript 和 XML)

首先介绍我们先一下 Ajax。

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

Ajax 是一种无需重新加载整个页面的情况下，能够更新部分网页的技术。

接着我们通过一个简单的例子来看看 ajax 的强大(为了方便调用接口我们直接使用网上链接https://cnodejs.org/api)，为了观看效果明显一些会使用点击事件让大家看看触发结果

Ajax 现代浏览器均支持 XMLHTTPRequest 对象，但是 IE5、IE6 需要兼容，下面就不做兼容处理了

```
<body>
    <button onclick="loadXML()">点击获取结果</button>
    <div></div>
    <script>

        function loadXML() {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    console.log(xmlhttp)
                    document.querySelector('div').innerHTML = JSON.parse(xmlhttp.responseText).data[0].content;
                }
            }
            xmlhttp.open('GET', 'https://cnodejs.org/api/v1/topics', true)
            xmlhttp.send()
            console.log('我先执行了')
        }
    </script>

</body>

```

可以看得到结果依然是先打印了后面的“我先执行了”

![Ajax](https://note.youdao.com/favicon.ico)

#### Promise 对象

什么是 promise 对象 ：

从英文翻译来讲就是”承诺“，既然是承诺肯定就需要去完成嘛，所以还是对应了上面说的 ，异步编程可以理解为在约定的时间内完成的操作。

promise 有三种状态：pendding ，fulfilled，rejected

- pendding： 初始状态，不成功，不失败，
- fulfilled：操作成功
- rejected：操作失败

当 promise 状态发生改变，就会触发 then()里的响应函数处理后续步骤；当 promise 状态一经改变，不会再变。

promise 的使用

```
setTimeout(() => console.log(1), 0); // 异步
const p = new Promise((resolve, reject) => {
    console.log(2);                 // 同步
    setTimeout(() => {
        console.log(4)               // 异步优先级低于promise
    }, 0)
    resolve(3);
    console.log(5);                 // 同步
})
console.log(6)                      // 同步
p.then(value => {
    console.log(value);             // 异步
})

console.log(7)                      // 同步
```

上面这一段代码其实在面试中很常见
执行结果是 2 5 6 7 3 1 4

![Promise1](https://note.youdao.com/favicon.ico)

再讲结果之前我们应该了解一下 es6 的新增的任务队列 是在事件循环之上的（onclick, setTimeout,Ajax）

- onclick 是浏览器内核的 DOM Binding 模块来处理的，当事件触发的时候，回调函数会立即添加到任务队列中。
- setTimeout 是浏览器内核的 timer 模块进行的延时处理，当时间到达后才会回调添加到任务队列中。
- Ajax 是浏览器内核 network 模块在网络请求完成之后，将回调添加到任务队列中。

代码也写了，结果也看了，但是我们为什么要用 promise 呢？

常见的回答都是解决回调地狱，其实 promise 也是用于解决异步编程的，
在 promise 未出现前，我们的异步编程都是通过纯回调解决的

举个例子

```
// 纯回调
function createdAsync(value,success,catch){
    if (value){
        success()
    }else{
        catch()
    }
}
const success = function (){
    console.log('成功')
}
const catch = catch(){
    console.log('失败')
}

createdAsync(value,success,catch)


// promise
const promise = createdAsync(value);
setTimeout(()=>{
    promise.then(success,catch);
},1000);

```

可以看得出 纯回调的形式是先指定回调函数，在我们想要启动异步任务前就必须指定好成功、失败的回调函数，而且我们不能在它完成后在指定回调函数，等他执行完毕已经获取不到数据了；
而 promise 是通过执行一个函数，这个函数返回一个 promise 对象，异步操作是在这个 Promise 对象内部进行的，也就是 Promise 构造函数执行时立即调用 executor 函数，此时异步任务开始了，但是并不需要指定成功、失败的回调函数。

可以再在来看看前面的代码（我们将代码写的简短一些）

```
const p = new Promise((resolve, reject) => {
    console.log("executor执行器函数"); //  executor执行器函数
    // 异步任务
    resolve("异步")
})
p.then(value => {
    console.log(value);
})
console.log("new Promise 之后")
```

打印结果是： ”executor 执行器函数“ 、”new Promise 之后“ 、“异步”

![Promise2](https://note.youdao.com/favicon.ico)

所以 promsie 其实不只是解决回调地狱问题，而说到了回调地狱，其实 async 函数显得更加优化。

#### Async 函数

什么是 async 函数

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
async 函数是什么？一句话，它就是 Generator 函数的语法糖。

但是我更加倾向于 async 函数是 Promise 语法糖。我们通过下面的例子看看。

```
 // 以往定义promise的时候
  new Promise((resolve,reject)=>{
    console.log('开始');
    resolve('异步');
  }).then(value => {console.log(value)})
```

```
// async函数
  async function fn(){}
  console.log(fn())  // Promise{<fulfilled>:undefined}
```

可以看得出 async 的返回值就是一个 Promise 对象 并且默认返回一个执行结果为成功的 Promise 对象，也就是 new Promise() 的语法糖

接着我们看看 async 下的 await

```
// promise
const promise = new Promise((resolve, reject) => {
    resolve('异步');
})

promise.then(value => {
    console.log(value)
})

// async
async function fn(callback) {
    const val = await callback;
    console.log(val)
}

fn(promise)
}
```

可以看得出 await 就是 then 的语法糖

接着我们看看这个语法糖为我们解决了什么问题

```
// promise
new Promise((resolve, reject) => {
    resolve(1);
}).then(value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value + 1)
        })
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value + 1)
        })
    });
}).then(value => {
    console.log(value + 1)
})
console.log('我先')

// ascyn

async function fn() {
    const one = await new Promise((resolve, reject) => {
        resolve(1)
    })
    const two = await new Promise((resolve, reject) => {
        resolve(one + 1)
    })
    console.log(two);
    console.log('我先')
}

fn()
```

可以看得出 promise 的执行会 先打印出 “我先”，而 asyn 函数 会将异步执行完毕再进行下面的操作，所以 async 函数不仅实现了异步编程，并且在代码的上来说执行顺序与排列顺序是一致的。

文中说的内容偏入门级别，也是结合自己所学以及理解。
最后想说的是随着前端开发的不断发展，前端开发人员掌握的技术已经不再是之前的 html+css 了（俗称的切图仔），并且前端开发人员需要掌握的技术不亚于后端了，甚至需要掌握一些后端知识。
