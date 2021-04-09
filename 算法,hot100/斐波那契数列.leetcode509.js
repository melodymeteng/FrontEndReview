// 带取模 1e9+7
var fib = function (n) {
    let n1 = 0,
        n2 = 1,
        sum;
    for (let i = 0; i < n; i++) {
        sum = (n1 + n2) % 1000000007;
        n1 = n2;
        n2 = sum;
    }
    return n1;
};
// 正常的斐波那契，直接使用滑动数组解决
var fib = function (n) {
    if (n < 2) return n;
    let p = 0,
        q = 1,
        m = 1;
    for (let i = 2; i < n; i++) {
        p = q;
        q = m;
        m = p + q;
    }
    return m;
};
