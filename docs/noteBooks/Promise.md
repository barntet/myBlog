# 从零手写 Promise 完整版

随着前端技术的不断发展，用户对界面的要求也在不断提高，现在的前端不再是之前的 html+css, 而是 html+css+js，但是想学好 js 首先要知道 js 的核心在于异步，说到异步大部分人第一时间会想到 Promise。

那么接下来我们就来学习一下 Promise 是如何实现的吧。

首先我们回顾一下 Promise 的基本使用

```
const p = new Promise((resolve,reject)=>{
    resolve('返回成功的值')
    reject('返回失败的值')
})

p.then(value=>{
    console.log(value) // 返回成功的值
})
```

1. new Promise 构造函数内的回调数是同步执行的
2. then 的回调函数，是异步执行的
3. 调用 resolve/reject 后，状态已定，状态不能再改变
4. .then 每次返回的都是新的 Promise
5. Promise 可以嵌套

接着我们从零开始来实现一下 Promise

先来实现明确一下基本的结构

```
(function(window){
    // 定义MyPromise构造函数
    function MyPromise(executor){

        function resolve(value){

        }
        function reject(reason){

        }
        executor(resolve,reject)
    }
    // MyPromise原型链上存在then方法
    MyPromise.prototype.then = function(onResolved,onRejected){

    }
    //MyPromise原型链上存在catch方法
    MyPromise.prototype.catch = function(onRejected){

    }

    //MyPromise实例对象上存在resolve方法
    MyPromise.resolve = function(value){

    }

    //MyPromise实例对象上存在reject方法
    MyPromise.reject = function(reason){

    }

    //MyPromise实例对象上存在all方法
    MyPromise.all = function(promises){

    }

    //MyPromise实例对象上存在race方法
    MyPromise.race = function(promises){

    }

    window.MyPromise = MyPromise;
})(window)
```

明确来了基本的结构后，接下里我们来看看 MyPromise 构造函数内需要做什么

1.定义 Promise 的初始状态、初始值、存放待执行异步函数的数组

```
(function(window){
    const PENDDING = 'pendding';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    function MyPromise(executor){
        const self = this;
        self.status = PENDDING; //初始状态
        self.data = undefined; // 初始值
        self.callbacks = []; // 待执行异步回调函数的数组

        function resolve(value){
        }
        function reject(reason){
        }
        executor(resolve,reject)
    }
    window.MyPromise = MyPromise;
})(window)
```

2. 根据 Promise 状态的不同，进行修，赋值，以及立即执行异步回调

```
(function (window) {
    const PENDDING = 'pendding';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    // 定义MyPromise
    function MyPromise(executor) {
        const self = this;
        self.status = PENDDING;
        self.data = undefined;
        self.callbacks = [];

        function resolve(value) {
            self.status = FULFILLED;
            self.data = value;
            // 立即执行异步回调函数
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onResolved(value);
                })
            })
        }

        function reject(reason) {
            self.status = REJECTED;
            self.data = reason;
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason);
                })
            })
        }
        executor(resolve, reject)
    }
    window.MyPromise = MyPromise;
```

3. 别忘了 Promise 的状态一旦改变就不能再修改了，所以在 resolve/reject 函数内需要加一个判断

```
(function (window) {
    const PENDDING = 'pendding';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    // 定义MyPromise
    function MyPromise(executor) {
        const self = this;
        self.status = PENDDING;
        self.data = undefined;
        self.callbacks = [];

        function resolve(value) {
            if (self.status !== PENDDING) return;
            self.status = FULFILLED;
            self.data = value;
            // 立即执行异步回调函数
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onResolved(value);
                })
            })
        }

        function reject(reason) {
            if (self.status !== PENDDING) return;
            self.status = REJECTED;
            self.data = reason;
            setTimeout(() => {
                self.callbacks.forEach(callbacksObj => {
                    callbacksObj.onRejected(reason);
                })
            })
        }
        executor(resolve, reject)
    }
    window.MyPromise = MyPromise;
```

4. Promise 原型链上的 then 方法，可以接收两个参数(且是回调函数)，成功/失败，并且每次返回的都是一个新的 Promise

```
// MyPromise原型链上存在then方法
MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
        // 首先判断当前状态
        if (self.status === FULFILLED) {
            /*
                1、返回的Promise的结果是由onResolved/onrejected决定的
                2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
                3、返回的不是Promise对象 (该值就是Promise的返回结果)
                4、抛出异常 异常的值为返回的结果
            */
            setTimeout(() => {
                try {
                    const result = onResolved(self.data);
                    if (reject instanceof MyPromise) {
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        })
                    } else {
                        resolve(result);
                    }

                } catch (error) {
                    reject(error);
                }
            });

        } else if (self.status === REJECTED) {
            setTimeout(() => {
                try {
                    const result = onRejected(self.data);
                    if (reject instanceof MyPromise) {
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        })
                    } else {
                        resolve(result);
                    }

                } catch (error) {
                    reject(error);
                }
            });

        } else if (self.status === PENDDING) {
            self.callbacks.push({
                onResolved() {
                    try {
                        const result = onResolved(self.data);
                        if (reject instanceof MyPromise) {
                            result.then(value => {
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            })
                        } else {
                            resolve(result);
                        }

                    } catch (error) {
                        reject(error);
                    }
                },
                onRejected() {
                    try {
                        const result = onRejected(self.data);
                        if (reject instanceof MyPromise) {
                            result.then(value => {
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            })
                        } else {
                            resolve(result);
                        }

                    } catch (error) {
                        reject(error);
                    }
                }
            })
        }
    })
}
```

好的停一下，一步一步讲解

1. .then 每次都返回一个新的 Promise，所以在.then 方法里是

   > return new MyPromise((resolve,reject)){}

2. 每一种状态都存在返回值，并且都能是一下三种情况
   1. 返回的是 Promise 对象
   2. 返回的不是 Promise 对象
   3. 抛出异常
3. FULFILLED/REJECTED 两种状态需要立即执行异步函数
4. PENDDING 为什么没有立即执行异步函数，因为当状态为 PENDDING 时就执行 then，会先往待执行回调函数的数组（callbacks）内存放这个回调，紧接着在回到 Promise 的执行其中执行 resolve/reject,而上面也写过了，执行 resolve/reject 会去待执行回调函数的数组内遍历并赋值。

![](https://imgkr2.cn-bj.ufileos.com/33d9b1f2-21f6-4a23-9424-8d866ac45bfb.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=5xRZQ%252FQZ8wmPycBQeiaFCxwNjtk%253D&Expires=1597917354)

好的继续，并且对上面重复的优化一下。

```
// MyPromise原型链上存在then方法
    MyPromise.prototype.then = function (onResolved, onRejected) {
        const self = this;
        return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
            function handle(callback) {
                /*
                    1、返回的Promise的结果是由onResolved/onrejected决定的
                    2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
                    3、返回的不是Promise对象 (该值就是Promise的返回结果)
                    4、抛出异常 异常的值为返回的结果
                */
                try {
                    const result = callback(self.data);
                    if (reject instanceof MyPromise) {
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        })
                    } else {
                        resolve(result);
                    }

                } catch (error) {
                    reject(error);
                }
            }
            // 首先判断当前状态
            if (self.status === FULFILLED) {
                setTimeout(() => {
                    thandle(onResolved)
                });

            } else if (self.status === REJECTED) {
                setTimeout(() => {
                    thandle(onRejected)
                });

            } else if (self.status === PENDDING) {
                self.callbacks.push({
                    onResolved() {
                        handle(onResolved)
                    },
                    onRejected() {
                        handle(onRejected)
                    }
                })
            }
        })
    }
```

5. 防止不穿成功或者失败的回调函数，给成功和失败都给一个默认回调函数

```
MyPromise.prototype.then = function (onResolved, onRejected) {
        const self = this;
        // 定义默认回调
        onResolved = typeof onResolved === "function" ? onResolved : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason};
        return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
            function handle(callback) {
                /*
                    1、返回的Promise的结果是由onResolved/onrejected决定的
                    2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
                    3、返回的不是Promise对象 (该值就是Promise的返回结果)
                    4、抛出异常 异常的值为返回的结果
                */
                try {
                    const result = callback(self.data);
                    if (reject instanceof MyPromise) {
                        result.then(value => {
                            resolve(value);
                        }, reason => {
                            reject(reason);
                        })
                    } else {
                        resolve(result);
                    }

                } catch (error) {
                    reject(error);
                }
            }
            // 首先判断当前状态
            if (self.status === FULFILLED) {
                setTimeout(() => {
                    thandle(onResolved)
                });

            } else if (self.status === REJECTED) {
                setTimeout(() => {
                    thandle(onRejected)
                });

            } else if (self.status === PENDDING) {
                self.callbacks.push({
                    onResolved() {
                        handle(onResolved)
                    },
                    onRejected() {
                        handle(onRejected)
                    }
                })
            }
        })
    }
```

6. 接着我们看看 catch，其实就是
   > Promise.prototype.then(undefined,rejected)

或者

> Promise.prototype.then(null,rejected)

```
//MyPromise原型链上存在catch方法
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  }
```

7、接下来实现一下 Promise.resolve/Promise.reject

```
/MyPromise实例对象上存在resolve方法
MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value))             // 返回一个resolved状态的Promise对象
}

//MyPromise实例对象上存在reject方法
MyPromise.reject = function (reason) {
    return new MyPromise((resolve,reject) => reject(reason));  // 返回一个reject状态Promise对象
}
```

8. 接下来实现一下 Promise.all/Promise.race

```
//MyPromise实例对象上存在all方法
MyPromise.all = function (promises) {
    let promisesCount = 0
    let values = new Array(promises.length);
    return new MyPromise((resolve,reject)=>{
        promises.forEach((promise,index)=>{
            promise.then(value => {
                promisesCount++;
                values[index] = value;
                if (promisesCount === promises.length){
                    resolve(values);
                }
            },reason => {
                reject(reason);
            })
        })
    })

}
```

好的,我们来看看 Promise.all 实现的思路

1. Promise.all 传入的是一个数组
2. Promise.all 返回的是一个数组
3. Promise.all 传入的数组中，每个 Promise 对象必须都正确才能返回正确的结果数组
4. Promise.all 传入的数组中任意一个对象返回错的结果，都会返回错误的结果

好的，其实我们还少一个步骤就是 Promise.all 传入的数组的参数可以不是 Promise 的实例, 所以数组参数如果不是 Promise 实例，先调用 Promise.resolve

```
//MyPromise实例对象上存在all方法
MyPromise.all = function (promises) {
    let promisesCount = 0
    let values = new Array(promises.length);
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          promisesCount++;
          values[index] = value;
          if (promisesCount === promises.length) {
            resolve(values);
          }
        }, reason => {
          reject(reason);
        })
      })
    })
}
```

Promise.race 实现

```
//MyPromise实例对象上存在race方法
  MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(value => {
          resolve(value);
        }, reason => {
          reject(reason)
        })
      })
    })
  }
```

好的,解释一下，

1.  Promise.race 传入的也是一个数组
2.  传入的 Promise 执行内容相同的情况下，Promise.race 返回的结果为数组中的第一个值
3.  若传入的 Promise 执行内容不一致，有先后区分，则结果为执行的最快的一个

至此从零手写一个 Promise 完成了，其中包括

> Promise.prototype.then

> Promise.prototype.catch

> Promise.resolve

> Promise.reject

> Promise.all

> Promise.race

```

(function (window) {

  const PENDDING = 'pendding';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  // 定义MyPromise
  function MyPromise(executor) {
    const self = this;
    self.status = PENDDING;
    self.data = undefined;
    self.callbacks = [];

    function resolve(value) {
      if (self.status !== PENDDING) return;
      self.status = FULFILLED;
      self.data = value;
      // 立即执行异步回调函数
      setTimeout(() => {
        self.callbacks.forEach(callbacksObj => {
          callbacksObj.onResolved(value);
        })
      })
    }

    function reject(reason) {
      if (self.status !== PENDDING) return;
      self.status = REJECTED;
      self.data = reason;
      setTimeout(() => {
        self.callbacks.forEach(callbacksObj => {
          callbacksObj.onRejected(reason);
        })
      })
    }
    try{
      executor(resolve, reject)
    }catch(error){
      reject(error)
    }

  }
  // MyPromise原型链上存在then方法
  MyPromise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    // 定义默认回调
    onResolved = typeof onResolved === "function" ? onResolved : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
      throw reason
    };
    return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
      function handle(callback) {
        /*
            1、返回的Promise的结果是由onResolved/onrejected决定的
            2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
            3、返回的不是Promise对象 (该值就是Promise的返回结果)
            4、抛出异常 异常的值为返回的结果
        */
        try {
          const result = callback(self.data);
          if (reject instanceof MyPromise) {
            result.then(value => {
              resolve(value);
            }, reason => {
              reject(reason);
            })
          } else {
            resolve(result);
          }

        } catch (error) {
          reject(error);
        }
      }
      // 首先判断当前状态
      if (self.status === FULFILLED) {
        setTimeout(() => {
          handle(onResolved)
        });

      } else if (self.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected)
        });

      } else if (self.status === PENDDING) {
        self.callbacks.push({
          onResolved() {
            handle(onResolved)
          },
          onRejected() {
            handle(onRejected)
          }
        })
      }
    })
  }
  //MyPromise原型链上存在catch方法
  MyPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
  }

  //MyPromise实例对象上存在resolve方法
  MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value)) // 返回一个resolved状态的Promise对象
  }

  //MyPromise实例对象上存在reject方法
  MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason)); // 返回一个reject状态Promise对象
  }

  //MyPromise实例对象上存在all方法
  MyPromise.all = function (promises) {
    let promisesCount = 0
    let values = new Array(promises.length);
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          promisesCount++;
          values[index] = value;
          if (promisesCount === promises.length) {
            resolve(values);
          }
        }, reason => {
          reject(reason);
        })
      })
    })
  }

  //MyPromise实例对象上存在race方法
  MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(value => {
          resolve(value);
        }, reason => {
          reject(reason)
        })
      })
    })
  }

  window.MyPromise = MyPromise;
})(window)
```

最后我们用类(class)的方式实现一下

```
(function (window) {
    const PENDDING = 'pendding';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';
    // 定义MyPromise
    class MyPromise {
        constructor(executor) {
            const self = this;
            self.status = PENDDING;
            self.data = undefined;
            self.callbacks = [];

            function resolve(value) {
                if (self.status !== PENDDING) return;
                self.status = FULFILLED;
                self.data = value;
                // 立即执行异步回调函数
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolved(value);
                    })
                })
            }

            function reject(reason) {
                if (self.status !== PENDDING) return;
                self.status = REJECTED;
                self.data = reason;
                setTimeout(() => {
                    self.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(reason);
                    })
                })
            }
            executor(resolve, reject)
        }
        // MyPromise原型链上存在then方法
        then(onResolved, onRejected) {
            const self = this;
            // 定义默认回调
            onResolved = typeof onResolved === "function" ? onResolved : value => value;
            onRejected = typeof onRejected === "function" ? onRejected : reason => {
                throw reason
            };
            return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
                function handle(callback) {
                    /*
                        1、返回的Promise的结果是由onResolved/onrejected决定的
                        2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
                        3、返回的不是Promise对象 (该值就是Promise的返回结果)
                        4、抛出异常 异常的值为返回的结果
                    */
                    try {
                        const result = callback(self.data);
                        if (reject instanceof MyPromise) {
                            result.then(value => {
                                resolve(value);
                            }, reason => {
                                reject(reason);
                            })
                        } else {
                            resolve(result);
                        }

                    } catch (error) {
                        reject(error);
                    }
                }
                // 首先判断当前状态
                if (self.status === FULFILLED) {
                    setTimeout(() => {
                        handle(onResolved)
                    });

                } else if (self.status === REJECTED) {
                    setTimeout(() => {
                        handle(onRejected)
                    });

                } else if (self.status === PENDDING) {
                    self.callbacks.push({
                        onResolved() {
                            handle(onResolved)
                        },
                        onRejected() {
                            handle(onRejected)
                        }
                    })
                }
            })
        }
        //MyPromise原型链上存在catch方法
        catch (onRejected) {
            return this.then(null, onRejected);
        }
        //MyPromise实例对象上存在resolve方法
        static resolve(value) {
            if (value instanceof MyPromise) return value;
            return new MyPromise(resolve => resolve(value)) // 返回一个resolved状态的Promise对象
        }
        //MyPromise实例对象上存在reject方法
        static reject(reason) {
            return new MyPromise((resolve, reject) => reject(reason)); // 返回一个reject状态Promise对象
        }
        //MyPromise实例对象上存在all方法
        static all(promises) {
            let promisesCount = 0
            let values = new Array(promises.length);
            return new MyPromise((resolve, reject) => {
                promises.forEach((promise, index) => {
                    MyPromise.resolve(promise).then(value => {
                        promisesCount++;
                        values[index] = value;
                        if (promisesCount === promises.length) {
                            resolve(values);
                        }
                    }, reason => {
                        reject(reason);
                    })
                })
            })
        }
        //MyPromise实例对象上存在race方法
        static race(promises) {
            return new MyPromise((resolve, reject) => {
                promises.forEach(promise => {
                    MyPromise.resolve(promise).then(value => {
                        resolve(value);
                    }, reason => {
                        reject(reason)
                    })
                })
            })
        }
    }
    window.MyPromise = MyPromise;
})(window)
```

从零手写 Promise 说难也不难，但是还是花了不少时间的，希望能够帮助到像我一样想学好 js，想学好 Promise 的朋友，一起加油吧。
