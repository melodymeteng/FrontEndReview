// 左右相比较，如果左边比右边大，那么就交换位置。然后在第一次整体循环结束后，记录一下最后一次交换的位置pos，下一次整体循环时从记录的位置开始

function sort(arr) {
    let i = arr.length - 1;
    while (i) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
    return arr;
}
