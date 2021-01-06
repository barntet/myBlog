(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{368:function(e,n,s){"use strict";s.r(n);var o=s(42),r=Object(o.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"从零手写-promise-完整版"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#从零手写-promise-完整版"}},[e._v("#")]),e._v(" 从零手写 Promise 完整版")]),e._v(" "),s("p",[e._v("随着前端技术的不断发展，用户对界面的要求也在不断提高，现在的前端不再是之前的 html+css, 而是 html+css+js，但是想学好 js 首先要知道 js 的核心在于异步，说到异步大部分人第一时间会想到 Promise。")]),e._v(" "),s("p",[e._v("那么接下来我们就来学习一下 Promise 是如何实现的吧。")]),e._v(" "),s("p",[e._v("首先我们回顾一下 Promise 的基本使用")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("const p = new Promise((resolve,reject)=>{\n    resolve('返回成功的值')\n    reject('返回失败的值')\n})\n\np.then(value=>{\n    console.log(value) // 返回成功的值\n})\n")])])]),s("ol",[s("li",[e._v("new Promise 构造函数内的回调数是同步执行的")]),e._v(" "),s("li",[e._v("then 的回调函数，是异步执行的")]),e._v(" "),s("li",[e._v("调用 resolve/reject 后，状态已定，状态不能再改变")]),e._v(" "),s("li",[e._v(".then 每次返回的都是新的 Promise")]),e._v(" "),s("li",[e._v("Promise 可以嵌套")])]),e._v(" "),s("p",[e._v("接着我们从零开始来实现一下 Promise")]),e._v(" "),s("p",[e._v("先来实现明确一下基本的结构")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("(function(window){\n    // 定义MyPromise构造函数\n    function MyPromise(executor){\n\n        function resolve(value){\n\n        }\n        function reject(reason){\n\n        }\n        executor(resolve,reject)\n    }\n    // MyPromise原型链上存在then方法\n    MyPromise.prototype.then = function(onResolved,onRejected){\n\n    }\n    //MyPromise原型链上存在catch方法\n    MyPromise.prototype.catch = function(onRejected){\n\n    }\n\n    //MyPromise实例对象上存在resolve方法\n    MyPromise.resolve = function(value){\n\n    }\n\n    //MyPromise实例对象上存在reject方法\n    MyPromise.reject = function(reason){\n\n    }\n\n    //MyPromise实例对象上存在all方法\n    MyPromise.all = function(promises){\n\n    }\n\n    //MyPromise实例对象上存在race方法\n    MyPromise.race = function(promises){\n\n    }\n\n    window.MyPromise = MyPromise;\n})(window)\n")])])]),s("p",[e._v("明确来了基本的结构后，接下里我们来看看 MyPromise 构造函数内需要做什么")]),e._v(" "),s("p",[e._v("1.定义 Promise 的初始状态、初始值、存放待执行异步函数的数组")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("(function(window){\n    const PENDDING = 'pendding';\n    const FULFILLED = 'fulfilled';\n    const REJECTED = 'rejected';\n    function MyPromise(executor){\n        const self = this;\n        self.status = PENDDING; //初始状态\n        self.data = undefined; // 初始值\n        self.callbacks = []; // 待执行异步回调函数的数组\n\n        function resolve(value){\n        }\n        function reject(reason){\n        }\n        executor(resolve,reject)\n    }\n    window.MyPromise = MyPromise;\n})(window)\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("根据 Promise 状态的不同，进行修，赋值，以及立即执行异步回调")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("(function (window) {\n    const PENDDING = 'pendding';\n    const FULFILLED = 'fulfilled';\n    const REJECTED = 'rejected';\n    // 定义MyPromise\n    function MyPromise(executor) {\n        const self = this;\n        self.status = PENDDING;\n        self.data = undefined;\n        self.callbacks = [];\n\n        function resolve(value) {\n            self.status = FULFILLED;\n            self.data = value;\n            // 立即执行异步回调函数\n            setTimeout(() => {\n                self.callbacks.forEach(callbacksObj => {\n                    callbacksObj.onResolved(value);\n                })\n            })\n        }\n\n        function reject(reason) {\n            self.status = REJECTED;\n            self.data = reason;\n            setTimeout(() => {\n                self.callbacks.forEach(callbacksObj => {\n                    callbacksObj.onRejected(reason);\n                })\n            })\n        }\n        executor(resolve, reject)\n    }\n    window.MyPromise = MyPromise;\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("别忘了 Promise 的状态一旦改变就不能再修改了，所以在 resolve/reject 函数内需要加一个判断")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("(function (window) {\n    const PENDDING = 'pendding';\n    const FULFILLED = 'fulfilled';\n    const REJECTED = 'rejected';\n    // 定义MyPromise\n    function MyPromise(executor) {\n        const self = this;\n        self.status = PENDDING;\n        self.data = undefined;\n        self.callbacks = [];\n\n        function resolve(value) {\n            if (self.status !== PENDDING) return;\n            self.status = FULFILLED;\n            self.data = value;\n            // 立即执行异步回调函数\n            setTimeout(() => {\n                self.callbacks.forEach(callbacksObj => {\n                    callbacksObj.onResolved(value);\n                })\n            })\n        }\n\n        function reject(reason) {\n            if (self.status !== PENDDING) return;\n            self.status = REJECTED;\n            self.data = reason;\n            setTimeout(() => {\n                self.callbacks.forEach(callbacksObj => {\n                    callbacksObj.onRejected(reason);\n                })\n            })\n        }\n        executor(resolve, reject)\n    }\n    window.MyPromise = MyPromise;\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[e._v("Promise 原型链上的 then 方法，可以接收两个参数(且是回调函数)，成功/失败，并且每次返回的都是一个新的 Promise")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// MyPromise原型链上存在then方法\nMyPromise.prototype.then = function (onResolved, onRejected) {\n    const self = this;\n    return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象\n        // 首先判断当前状态\n        if (self.status === FULFILLED) {\n            /*\n                1、返回的Promise的结果是由onResolved/onrejected决定的\n                2、返回的是Promise对象 (根据执结果决定Promise的返回结果)\n                3、返回的不是Promise对象 (该值就是Promise的返回结果)\n                4、抛出异常 异常的值为返回的结果\n            */\n            setTimeout(() => {\n                try {\n                    const result = onResolved(self.data);\n                    if (reject instanceof MyPromise) {\n                        result.then(value => {\n                            resolve(value);\n                        }, reason => {\n                            reject(reason);\n                        })\n                    } else {\n                        resolve(result);\n                    }\n\n                } catch (error) {\n                    reject(error);\n                }\n            });\n\n        } else if (self.status === REJECTED) {\n            setTimeout(() => {\n                try {\n                    const result = onRejected(self.data);\n                    if (reject instanceof MyPromise) {\n                        result.then(value => {\n                            resolve(value);\n                        }, reason => {\n                            reject(reason);\n                        })\n                    } else {\n                        resolve(result);\n                    }\n\n                } catch (error) {\n                    reject(error);\n                }\n            });\n\n        } else if (self.status === PENDDING) {\n            self.callbacks.push({\n                onResolved() {\n                    try {\n                        const result = onResolved(self.data);\n                        if (reject instanceof MyPromise) {\n                            result.then(value => {\n                                resolve(value);\n                            }, reason => {\n                                reject(reason);\n                            })\n                        } else {\n                            resolve(result);\n                        }\n\n                    } catch (error) {\n                        reject(error);\n                    }\n                },\n                onRejected() {\n                    try {\n                        const result = onRejected(self.data);\n                        if (reject instanceof MyPromise) {\n                            result.then(value => {\n                                resolve(value);\n                            }, reason => {\n                                reject(reason);\n                            })\n                        } else {\n                            resolve(result);\n                        }\n\n                    } catch (error) {\n                        reject(error);\n                    }\n                }\n            })\n        }\n    })\n}\n")])])]),s("p",[e._v("好的停一下，一步一步讲解")]),e._v(" "),s("ol",[s("li",[s("p",[e._v(".then 每次都返回一个新的 Promise，所以在.then 方法里是")]),e._v(" "),s("blockquote",[s("p",[e._v("return new MyPromise((resolve,reject)){}")])])]),e._v(" "),s("li",[s("p",[e._v("每一种状态都存在返回值，并且都能是一下三种情况")]),e._v(" "),s("ol",[s("li",[e._v("返回的是 Promise 对象")]),e._v(" "),s("li",[e._v("返回的不是 Promise 对象")]),e._v(" "),s("li",[e._v("抛出异常")])])]),e._v(" "),s("li",[s("p",[e._v("FULFILLED/REJECTED 两种状态需要立即执行异步函数")])]),e._v(" "),s("li",[s("p",[e._v("PENDDING 为什么没有立即执行异步函数，因为当状态为 PENDDING 时就执行 then，会先往待执行回调函数的数组（callbacks）内存放这个回调，紧接着在回到 Promise 的执行其中执行 resolve/reject,而上面也写过了，执行 resolve/reject 会去待执行回调函数的数组内遍历并赋值。")])])]),e._v(" "),s("p",[s("img",{attrs:{src:"https://imgkr2.cn-bj.ufileos.com/33d9b1f2-21f6-4a23-9424-8d866ac45bfb.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=5xRZQ%252FQZ8wmPycBQeiaFCxwNjtk%253D&Expires=1597917354",alt:""}})]),e._v(" "),s("p",[e._v("好的继续，并且对上面重复的优化一下。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// MyPromise原型链上存在then方法\n    MyPromise.prototype.then = function (onResolved, onRejected) {\n        const self = this;\n        return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象\n            function handle(callback) {\n                /*\n                    1、返回的Promise的结果是由onResolved/onrejected决定的\n                    2、返回的是Promise对象 (根据执结果决定Promise的返回结果)\n                    3、返回的不是Promise对象 (该值就是Promise的返回结果)\n                    4、抛出异常 异常的值为返回的结果\n                */\n                try {\n                    const result = callback(self.data);\n                    if (reject instanceof MyPromise) {\n                        result.then(value => {\n                            resolve(value);\n                        }, reason => {\n                            reject(reason);\n                        })\n                    } else {\n                        resolve(result);\n                    }\n\n                } catch (error) {\n                    reject(error);\n                }\n            }\n            // 首先判断当前状态\n            if (self.status === FULFILLED) {\n                setTimeout(() => {\n                    thandle(onResolved)\n                });\n\n            } else if (self.status === REJECTED) {\n                setTimeout(() => {\n                    thandle(onRejected)\n                });\n\n            } else if (self.status === PENDDING) {\n                self.callbacks.push({\n                    onResolved() {\n                        handle(onResolved)\n                    },\n                    onRejected() {\n                        handle(onRejected)\n                    }\n                })\n            }\n        })\n    }\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[e._v("防止不穿成功或者失败的回调函数，给成功和失败都给一个默认回调函数")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('MyPromise.prototype.then = function (onResolved, onRejected) {\n        const self = this;\n        // 定义默认回调\n        onResolved = typeof onResolved === "function" ? onResolved : value => value;\n        onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason};\n        return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象\n            function handle(callback) {\n                /*\n                    1、返回的Promise的结果是由onResolved/onrejected决定的\n                    2、返回的是Promise对象 (根据执结果决定Promise的返回结果)\n                    3、返回的不是Promise对象 (该值就是Promise的返回结果)\n                    4、抛出异常 异常的值为返回的结果\n                */\n                try {\n                    const result = callback(self.data);\n                    if (reject instanceof MyPromise) {\n                        result.then(value => {\n                            resolve(value);\n                        }, reason => {\n                            reject(reason);\n                        })\n                    } else {\n                        resolve(result);\n                    }\n\n                } catch (error) {\n                    reject(error);\n                }\n            }\n            // 首先判断当前状态\n            if (self.status === FULFILLED) {\n                setTimeout(() => {\n                    thandle(onResolved)\n                });\n\n            } else if (self.status === REJECTED) {\n                setTimeout(() => {\n                    thandle(onRejected)\n                });\n\n            } else if (self.status === PENDDING) {\n                self.callbacks.push({\n                    onResolved() {\n                        handle(onResolved)\n                    },\n                    onRejected() {\n                        handle(onRejected)\n                    }\n                })\n            }\n        })\n    }\n')])])]),s("ol",{attrs:{start:"6"}},[s("li",[e._v("接着我们看看 catch，其实就是\n"),s("blockquote",[s("p",[e._v("Promise.prototype.then(undefined,rejected)")])])])]),e._v(" "),s("p",[e._v("或者")]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.prototype.then(null,rejected)")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("//MyPromise原型链上存在catch方法\n  MyPromise.prototype.catch = function (onRejected) {\n    return this.then(null, onRejected);\n  }\n")])])]),s("p",[e._v("7、接下来实现一下 Promise.resolve/Promise.reject")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("/MyPromise实例对象上存在resolve方法\nMyPromise.resolve = function (value) {\n    if (value instanceof MyPromise) return value;\n    return new MyPromise(resolve => resolve(value))             // 返回一个resolved状态的Promise对象\n}\n\n//MyPromise实例对象上存在reject方法\nMyPromise.reject = function (reason) {\n    return new MyPromise((resolve,reject) => reject(reason));  // 返回一个reject状态Promise对象\n}\n")])])]),s("ol",{attrs:{start:"8"}},[s("li",[e._v("接下来实现一下 Promise.all/Promise.race")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("//MyPromise实例对象上存在all方法\nMyPromise.all = function (promises) {\n    let promisesCount = 0\n    let values = new Array(promises.length);\n    return new MyPromise((resolve,reject)=>{\n        promises.forEach((promise,index)=>{\n            promise.then(value => {\n                promisesCount++;\n                values[index] = value;\n                if (promisesCount === promises.length){\n                    resolve(values);\n                }\n            },reason => {\n                reject(reason);\n            })\n        })\n    })\n\n}\n")])])]),s("p",[e._v("好的,我们来看看 Promise.all 实现的思路")]),e._v(" "),s("ol",[s("li",[e._v("Promise.all 传入的是一个数组")]),e._v(" "),s("li",[e._v("Promise.all 返回的是一个数组")]),e._v(" "),s("li",[e._v("Promise.all 传入的数组中，每个 Promise 对象必须都正确才能返回正确的结果数组")]),e._v(" "),s("li",[e._v("Promise.all 传入的数组中任意一个对象返回错的结果，都会返回错误的结果")])]),e._v(" "),s("p",[e._v("好的，其实我们还少一个步骤就是 Promise.all 传入的数组的参数可以不是 Promise 的实例, 所以数组参数如果不是 Promise 实例，先调用 Promise.resolve")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("//MyPromise实例对象上存在all方法\nMyPromise.all = function (promises) {\n    let promisesCount = 0\n    let values = new Array(promises.length);\n    return new MyPromise((resolve, reject) => {\n      promises.forEach((promise, index) => {\n        MyPromise.resolve(promise).then(value => {\n          promisesCount++;\n          values[index] = value;\n          if (promisesCount === promises.length) {\n            resolve(values);\n          }\n        }, reason => {\n          reject(reason);\n        })\n      })\n    })\n}\n")])])]),s("p",[e._v("Promise.race 实现")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("//MyPromise实例对象上存在race方法\n  MyPromise.race = function (promises) {\n    return new MyPromise((resolve, reject) => {\n      promises.forEach(promise => {\n        MyPromise.resolve(promise).then(value => {\n          resolve(value);\n        }, reason => {\n          reject(reason)\n        })\n      })\n    })\n  }\n")])])]),s("p",[e._v("好的,解释一下，")]),e._v(" "),s("ol",[s("li",[e._v("Promise.race 传入的也是一个数组")]),e._v(" "),s("li",[e._v("传入的 Promise 执行内容相同的情况下，Promise.race 返回的结果为数组中的第一个值")]),e._v(" "),s("li",[e._v("若传入的 Promise 执行内容不一致，有先后区分，则结果为执行的最快的一个")])]),e._v(" "),s("p",[e._v("至此从零手写一个 Promise 完成了，其中包括")]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.prototype.then")])]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.prototype.catch")])]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.resolve")])]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.reject")])]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.all")])]),e._v(" "),s("blockquote",[s("p",[e._v("Promise.race")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("\n(function (window) {\n\n  const PENDDING = 'pendding';\n  const FULFILLED = 'fulfilled';\n  const REJECTED = 'rejected';\n  // 定义MyPromise\n  function MyPromise(executor) {\n    const self = this;\n    self.status = PENDDING;\n    self.data = undefined;\n    self.callbacks = [];\n\n    function resolve(value) {\n      if (self.status !== PENDDING) return;\n      self.status = FULFILLED;\n      self.data = value;\n      // 立即执行异步回调函数\n      setTimeout(() => {\n        self.callbacks.forEach(callbacksObj => {\n          callbacksObj.onResolved(value);\n        })\n      })\n    }\n\n    function reject(reason) {\n      if (self.status !== PENDDING) return;\n      self.status = REJECTED;\n      self.data = reason;\n      setTimeout(() => {\n        self.callbacks.forEach(callbacksObj => {\n          callbacksObj.onRejected(reason);\n        })\n      })\n    }\n    try{\n      executor(resolve, reject)\n    }catch(error){\n      reject(error)\n    }\n\n  }\n  // MyPromise原型链上存在then方法\n  MyPromise.prototype.then = function (onResolved, onRejected) {\n    const self = this;\n    // 定义默认回调\n    onResolved = typeof onResolved === \"function\" ? onResolved : value => value;\n    onRejected = typeof onRejected === \"function\" ? onRejected : reason => {\n      throw reason\n    };\n    return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象\n      function handle(callback) {\n        /*\n            1、返回的Promise的结果是由onResolved/onrejected决定的\n            2、返回的是Promise对象 (根据执结果决定Promise的返回结果)\n            3、返回的不是Promise对象 (该值就是Promise的返回结果)\n            4、抛出异常 异常的值为返回的结果\n        */\n        try {\n          const result = callback(self.data);\n          if (reject instanceof MyPromise) {\n            result.then(value => {\n              resolve(value);\n            }, reason => {\n              reject(reason);\n            })\n          } else {\n            resolve(result);\n          }\n\n        } catch (error) {\n          reject(error);\n        }\n      }\n      // 首先判断当前状态\n      if (self.status === FULFILLED) {\n        setTimeout(() => {\n          handle(onResolved)\n        });\n\n      } else if (self.status === REJECTED) {\n        setTimeout(() => {\n          handle(onRejected)\n        });\n\n      } else if (self.status === PENDDING) {\n        self.callbacks.push({\n          onResolved() {\n            handle(onResolved)\n          },\n          onRejected() {\n            handle(onRejected)\n          }\n        })\n      }\n    })\n  }\n  //MyPromise原型链上存在catch方法\n  MyPromise.prototype.catch = function (onRejected) {\n    return this.then(null, onRejected);\n  }\n\n  //MyPromise实例对象上存在resolve方法\n  MyPromise.resolve = function (value) {\n    if (value instanceof MyPromise) return value;\n    return new MyPromise(resolve => resolve(value)) // 返回一个resolved状态的Promise对象\n  }\n\n  //MyPromise实例对象上存在reject方法\n  MyPromise.reject = function (reason) {\n    return new MyPromise((resolve, reject) => reject(reason)); // 返回一个reject状态Promise对象\n  }\n\n  //MyPromise实例对象上存在all方法\n  MyPromise.all = function (promises) {\n    let promisesCount = 0\n    let values = new Array(promises.length);\n    return new MyPromise((resolve, reject) => {\n      promises.forEach((promise, index) => {\n        MyPromise.resolve(promise).then(value => {\n          promisesCount++;\n          values[index] = value;\n          if (promisesCount === promises.length) {\n            resolve(values);\n          }\n        }, reason => {\n          reject(reason);\n        })\n      })\n    })\n  }\n\n  //MyPromise实例对象上存在race方法\n  MyPromise.race = function (promises) {\n    return new MyPromise((resolve, reject) => {\n      promises.forEach(promise => {\n        MyPromise.resolve(promise).then(value => {\n          resolve(value);\n        }, reason => {\n          reject(reason)\n        })\n      })\n    })\n  }\n\n  window.MyPromise = MyPromise;\n})(window)\n")])])]),s("p",[e._v("最后我们用类(class)的方式实现一下")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("(function (window) {\n    const PENDDING = 'pendding';\n    const FULFILLED = 'fulfilled';\n    const REJECTED = 'rejected';\n    // 定义MyPromise\n    class MyPromise {\n        constructor(executor) {\n            const self = this;\n            self.status = PENDDING;\n            self.data = undefined;\n            self.callbacks = [];\n\n            function resolve(value) {\n                if (self.status !== PENDDING) return;\n                self.status = FULFILLED;\n                self.data = value;\n                // 立即执行异步回调函数\n                setTimeout(() => {\n                    self.callbacks.forEach(callbacksObj => {\n                        callbacksObj.onResolved(value);\n                    })\n                })\n            }\n\n            function reject(reason) {\n                if (self.status !== PENDDING) return;\n                self.status = REJECTED;\n                self.data = reason;\n                setTimeout(() => {\n                    self.callbacks.forEach(callbacksObj => {\n                        callbacksObj.onRejected(reason);\n                    })\n                })\n            }\n            executor(resolve, reject)\n        }\n        // MyPromise原型链上存在then方法\n        then(onResolved, onRejected) {\n            const self = this;\n            // 定义默认回调\n            onResolved = typeof onResolved === \"function\" ? onResolved : value => value;\n            onRejected = typeof onRejected === \"function\" ? onRejected : reason => {\n                throw reason\n            };\n            return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象\n                function handle(callback) {\n                    /*\n                        1、返回的Promise的结果是由onResolved/onrejected决定的\n                        2、返回的是Promise对象 (根据执结果决定Promise的返回结果)\n                        3、返回的不是Promise对象 (该值就是Promise的返回结果)\n                        4、抛出异常 异常的值为返回的结果\n                    */\n                    try {\n                        const result = callback(self.data);\n                        if (reject instanceof MyPromise) {\n                            result.then(value => {\n                                resolve(value);\n                            }, reason => {\n                                reject(reason);\n                            })\n                        } else {\n                            resolve(result);\n                        }\n\n                    } catch (error) {\n                        reject(error);\n                    }\n                }\n                // 首先判断当前状态\n                if (self.status === FULFILLED) {\n                    setTimeout(() => {\n                        handle(onResolved)\n                    });\n\n                } else if (self.status === REJECTED) {\n                    setTimeout(() => {\n                        handle(onRejected)\n                    });\n\n                } else if (self.status === PENDDING) {\n                    self.callbacks.push({\n                        onResolved() {\n                            handle(onResolved)\n                        },\n                        onRejected() {\n                            handle(onRejected)\n                        }\n                    })\n                }\n            })\n        }\n        //MyPromise原型链上存在catch方法\n        catch (onRejected) {\n            return this.then(null, onRejected);\n        }\n        //MyPromise实例对象上存在resolve方法\n        static resolve(value) {\n            if (value instanceof MyPromise) return value;\n            return new MyPromise(resolve => resolve(value)) // 返回一个resolved状态的Promise对象\n        }\n        //MyPromise实例对象上存在reject方法\n        static reject(reason) {\n            return new MyPromise((resolve, reject) => reject(reason)); // 返回一个reject状态Promise对象\n        }\n        //MyPromise实例对象上存在all方法\n        static all(promises) {\n            let promisesCount = 0\n            let values = new Array(promises.length);\n            return new MyPromise((resolve, reject) => {\n                promises.forEach((promise, index) => {\n                    MyPromise.resolve(promise).then(value => {\n                        promisesCount++;\n                        values[index] = value;\n                        if (promisesCount === promises.length) {\n                            resolve(values);\n                        }\n                    }, reason => {\n                        reject(reason);\n                    })\n                })\n            })\n        }\n        //MyPromise实例对象上存在race方法\n        static race(promises) {\n            return new MyPromise((resolve, reject) => {\n                promises.forEach(promise => {\n                    MyPromise.resolve(promise).then(value => {\n                        resolve(value);\n                    }, reason => {\n                        reject(reason)\n                    })\n                })\n            })\n        }\n    }\n    window.MyPromise = MyPromise;\n})(window)\n")])])]),s("p",[e._v("从零手写 Promise 说难也不难，但是还是花了不少时间的，希望能够帮助到像我一样想学好 js，想学好 Promise 的朋友，一起加油吧。")])])}),[],!1,null,null,null);n.default=r.exports}}]);