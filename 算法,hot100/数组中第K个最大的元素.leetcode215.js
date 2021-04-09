var findKthLargest = function (nums, k) {
    // 第一种方法：直接用sort给他进行降序排列
    // let arr = nums.sort((a, b) => b - a);
    // return arr[k-1]

    // 第二种方法：先用快排进行升序排列，然后对数组进行反转，返回第K-1个大的数
    let arr = sortArr(nums);
    return arr.reverse()[k - 1];
};

var sortArr = function (arr) {
    if (arr.length < 2) return arr;
    let left = [],
        right = [];
    let mid = Math.floor(arr.length / 2);
    let midVal = arr.splice(mid, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < midVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return sortArr(left).concat(midVal, sortArr(right));
};
