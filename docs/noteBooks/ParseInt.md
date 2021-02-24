# parseInt
相信大多数前端开发都会遇到这个困惑，总是觉得js 的编译不按照自己所预想执行。

今天我们来看看`parseInt`遇见`map`时的返回结果是不是依然出乎意料。

```
const transNumber = ['10','20','30','40'].map(parseInt);
// [10,NaN,NaN,NaN]

```

答案是不是与很多小伙伴心中想的不一致，是就对了。

下面解释一下 （标题先放一个链接，减少复制粘贴）



> 划重点

 [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
1. arr.map((currentValue,currentIndex,arr)=>{},thisArg) // 当前正在处理的元素，当前正在处理的元素的索引，调用map方法的数组
2. 返回一个新的数组
3. thisArg （callback函数执行时被用作this指向）
4. 语法

```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])

```

[parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

1. parseInt(string,radix)
2. 给定的字符串解析出一个整数，如果不是NaN，返回值将是以第一个参数作为指定基数 radix 的转换后的十进制整数

重点

```
如果 radix 是 undefined、0或未指定的，JavaScript会假定以下情况：

如果输入的 string以 "0x"或 "0x"（一个0，后面是小写或大写的X）开头，那么radix被假定为16，字符串的其余部分被当做十六进制数去解析。
如果输入的 string以 "0"（0）开头， radix被假定为8（八进制）或10（十进制）。具体选择哪一个radix取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。
如果第一个字符不能转换为数字，parseInt会返回 NaN。
```


好了，现在我们来分解一个上面的例子：

```
const transNumber = ['10','20','30','40'].map(parseInt);
// [10,NaN,NaN,NaN]

分解后

const transNumber = ['10','20','30','40'].map((current,currentIndex) => {
    return parseInt(current,currentIndex);
})

// '10' 0 = 10
// '20' 1 = NaN
// '30' 2 = NaN
// '40' 3 = NaN
```

什么意思呢，下面的代码就是我对parseInt的理解
```
var transNumber = function (string, radix) {
            // 这里就是按照上面所说的重点进行的判断
            if (!radix) {
                return Number(string);
            } else {
                // 先判断string的值首位是否大于radix
                const firstString = Number(string.substr(0, 1));
                if (firstString >= radix) return NaN;
                return string.split('').reverse().reduce((total, current, index) => {
                    total += (Number(current) * (Math.pow(radix, index)))
                    return total;
                }, 0)
            }
        }

        console.log(['10', '10', '10', '10', '30'].map(transNumber));}
        
```

这样看是不是好理解一点了，如果存在radix且是上面所说的“重点”那么就是将当前的值直接转换成10进制，如果不是先判断当前的这个值的首位是否大于等于radix再进行转换。

 