# js 常见的对象与数组之间的转换你都知道吗？

最近公司项目重构，看了看之前的代码发现很多因为数据结构导致的问题，可是没办法啊，打工个人。所以总结了一些平时开发中对象与数组常用的方法与它们之间相互转换的方法。

# 数组转对象

### 展开运算符 (...)

这是一个简单快速的方法

```
const arr = ['one','two','three'];
const obj = {...arr};
console.log(obj);    // { 0: 'one', 1: 'tow', 2: 'three' }

```

### Objcet.assign(target, ...sources)

将所有可枚举属性的值从一个或多个源对象分配到目标对象

参数： target：目标对象、...sources：源对象

返回值：目标对象

```
const arr = ['one','two','three'];
const obj = Object.assign({}, arr);
console.log(obj);       // { 0: 'one', 1: 'tow', 2: 'three' }
```

### Object.fromEntries(iterable)

把键值对转换为一个对象。

参数：类似 Array、Map

返回值：由该迭代对象条目提供对应属性的新对象

当我们遇到如下的结构时我们可以很轻松的将这个数组转换为对象

```
const arr = [ ['a', 1], ['b', 2], ['c', 3] ];
const obj = Object.fromEntries(arr);
console.log(obj);    // { a:1 , b: 2, c: 3 }

```

### forEach

```
const arr = [1,2,3,4,5];
let obj = {};

arr.forEach((item,index) => {
    obj[index] = item;
})

console.log(obj);     //{ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 }

```

# 对象转数组

### Object.entries(obj)

把一个键值对转换为数组

参数： 可以返回其自身可枚举属性的键值对的对象

返回值：返回一个其自身可枚举属性的键值对数组

当我们遇到如下的结构时我们可以很轻松的将这个对象转换为数组

```
const obj = { a:1 , b: 2, c: 3 };
const arr = Object.entries(obj);
console.log(arr);   // [ ['a', 1], ['b', 2], ['c', 3] ]

```

### Object.keys(obj)

由给定的对象自身可枚举的属性组成的数组

参数：对象

返回值：给定对象的属性组成的字符串数组

通常会配合一些数组的方法使用，如下

```
const obj = { a:1 , b: 2, c: 3 };
const arr = Object.keys(obj).map(item => obj[item]);
console.log(arr);  // [1, 2, 3];

也可以得到上面那样的结果

const arr = Object.keys(obj).map(item => [item, lobj[item]]);
console.log(arr);  // [ ['a', 1], ['b', 2], ['c', 3] ]

```

### Object.values(obj)

由给定的对象自身可枚举的属性值组成的数组

参数：对象

返回值：给定对象的属性值组成的字符串数组

```
const obj = { a:1 , b: 2, c: 3 };
const arr = Object.values(obj);
console.log(arr);  // [1, 2, 3];

```

### Array.from(array, fn, this)

从一个类似数组对象或可迭代对象创建一个新的，浅拷贝的数组实例。

参数：

    array：要变换成数组的为数组对象或可迭代对象

    fn: 指定了该参数，新数组中的每个元素都会执行该回调函数

    this: 执行回调函数时的this对象

返回值：一个新的数组实例

先来说说什么是类似数组：就是含有 length 和索引属性的对象，如下就是一个简单的类似数组对象

```
const obj = {
    0: 'name',
    1: 'age',
    2: 'sex',
    3: 'height'
    length: 3,
}
```

> 注意：类似数组对象的`length`的值，决定了返回数组的长度

什么是可迭代对象：Array、Set、Map 和字符串都是可迭代对象，更直接的是在控制台上看看当前的对象的原型链上是否有 `Symbol`的方法 ，看看下面通过生成器创建的可迭代对象

```
const obj = {
    0: 'name',
    1: 'age',
    2: 'sex',
    3: 'height',
}

function *createIterator(obj){
    for(let value in obj){
        yield obj[value];
    }
}

let iterator = createIterator(obj);

```

好的，我们来试试用 Array.from 创建一个数组吧。

```
类似数组对象

const obj = {
    0: 'name',
    1: 'age',
    2: 'sex',
    3: 'height',
    length: 3,
}

const arr = Array.from(obj);

console.log(arr);    //['name', 'age', 'sex' ];

输出3个是因为上面说的length的长度决定了数组的长度


可迭代对象

const obj2 = {
    0: 'name',
    1: 'age',
    2: 'sex',
    3: 'height'
}

function *createIterator(obj){
    for(let value in obj){
        yield obj[value];
    }
}

let iterator = createIterator(obj);

const arr2 = Arry.from(iterator);

console.log(arr2);    //['name', 'age', 'sex', 'height' ];

```

以上就是常见的一些数组与对象之间转换的方法，有不好的地点就要麻烦大家指出了，既然都看到最后了不如动手试一试这些方法吧。
