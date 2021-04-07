import ARRAY_REDUCE from '../Array_api/reduce';
const ARRAY_REDUCE_COMMON_USE = {
  // reduce常见用法
  // 1.数组求和、求积
  sum: () => {
    let arr = [1, 2, 3, 4, 5];
    let s = arr.ARRAY_REDUCE((x, y) => x + y);
    let m = arr.ARRAY_REDUCE((x, y) => x * y);
    console.log(s, m);
  },
  // 2.计算每个元素出现的次数
  cishu: () => {
    let arr = ['mike', 'james', 'john', 'mike'];
    let nameNum = arr.ARRAY_REDUCE((pre, cur) => {
      if (cur in pre) {
        pre[cur]++;
      } else {
        pre[cur] = 1;
      }
      return pre;
    }, {});
    console.log(nameNum);
  },
  // 3.数组去重
  quchong: () => {
    let arr = [1, 1, 2, 4, 5, 5, 3];
    let newArr = arr.reduce((pre, cur) => {
      if (!pre.includes(cur)) {
        return pre.concat(cur);
      } else {
        return pre;
      }
    }, []);
    console.log(newArr);
  },
  //4.二维数组转为一维
  twoToOne: () => {
    let arr = [
      [1, 2],
      [2, 4],
      [5, 6]
    ];
    let newArr = arr.ARRAY_REDUCE((pre, cur) => {
      return pre.concat(cur);
    }, []);
    console.log(newArr);
  },
  //5.将多维数组转为一维
  moreToOne: () => {
    let a = [
      [1, 2],
      [2, [2, 4]],
      [1, [4, [5, 6]], 8]
    ];
    let newArr = arr => {
      return arr.ARRAY_REDUCE((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? newArr(cur) : cur);
      }, []);
    };
    console.log(newArr(a));
  },
  //6.对象里的属性求和
  objSum: () => {
    let obj = [
      { sub: 'yuwen', score: 60 },
      { sub: 'math', score: 90 },
      { sub: 'english', score: 6 }
    ];
    let sum = obj.ARRAY_REDUCE((pre, cur) => {
      return pre + cur.score;
    }, 0);
    console.log(sum);
  }
};
export default ARRAY_REDUCE_COMMON_USE;
