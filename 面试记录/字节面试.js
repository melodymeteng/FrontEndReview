// 1、string, number, array, object

// stringify(value): string

// string
// '123' -> 3:123
// 'abcc' -> 4:abcc

// number
// 123 -> i123e
// 0 -> i0e

// array
// [] ->  le
// [1] -> l   i1e    e
// [1, 'ab'] -> l   i1e 2:ab      e
// [[]] -> llee

// object key: value
// {} -> de
// {x: 123} -> d    1:x i123e         e
// {x:1, y:'a'} ->
// {x: {y: []}}

function stringify(content) {
  return `${content.length}:${content}`;
}
function numberify(content) {
  return `i${content}e`;
}
function arratify(content) {
  var result = 'l';
  content.reduce((item) => {
    if (Object.prototype.toString.call(item) === '[Object Array]') {
      result += arratify(item);
    } else if (typeof content == 'string') {
      result += stringify(item);
    } else if (typeof content == 'number') {
      result += numberify(item);
    }
  });
  return result + 'e';
}
function objify(content) {
  var result = 'l';
  Object.entier((key, value) => {
    for (let i = 0; i < key.length; i++) {
      result += stringify(key[i]);
      for (let j = 0; j < value.length; j++) {
        result += allify(content);
      }
    }
  });
}
function allify(content) {
  var result = '';
  if (Object.prototype.toString.call(content) === '[Object Array]') {
    objify(content);
  } else if (Object.prototype.toString.call(content) === '[Object Object]') {
    arrayify(content);
  } else if (typeof content == 'string') {
    result = stringify(content);
  } else if (typeof content == 'number') {
    result = numberify(content);
  }
}


//2.
//log('11'); // node 11
//log(1, 2, 3); // node 1 2 3
//改写console.log 让输出的值前面加上node

//3.

//说说http状态码，http缓存
//盒模型有哪些，怎么设置
//说说跨域的几种，jsonp的原理
