var climbStairs = function (n) {
    //动态规划：在n-1级和n-2级时都只有各有一种方法走完楼梯，那么这就是重复的子集解，那么dp[n] = dp[n-1]+dp[n-2]
    //当楼梯0到0只有一种方法，0到1也只有一种，所以初始dp[0],dp[1]都等于1，dp[2] = dp[1] + dp[0] = 2,直接从2开始遍历
    //对应的函数表达式即为 f(x) = f(x-1) + f(x-2),最后输出的f(x)也就是dp[n]就是答案
    // let dp = [];
    // dp[0] = 1;
    // dp[1] = 1;
    // for (let i = 2; i <= n; i++) {
    //     dp[i] = dp[i - 1] + dp[i - 2]
    // }
    // return dp[n]
    //滚动数组，1种以上解法n必须大于等于2，从1开始遍历，设置三个值，前、后、结果
    //第一次遍历，q的结果赋给p，res的结果赋给q，res等于前后相加，最后可得答案
    let p = 0,
        q = 0,
        res = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = res;
        res = q + p;
    }
    return res;
};
