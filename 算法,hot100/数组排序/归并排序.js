// 1.先将数组分割成两个长度为len/2的子数组，然后在对子数组进行递归归并排序，直到子数组有序后，把这两个子数组再合并起来

function sort(arr) {
    let len = arr.length;
    if (len < 2) {
        return arr;
    }
    let middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(sort(left), sort(right));
}

function merge(left, right) {
    let res = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }
    while (left.length) {
        res.push(left.shift());
    }
    while (right.length) {
        res.push(right.shift());
    }
    return res;
}
