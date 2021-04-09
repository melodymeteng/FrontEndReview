function sort(arr) {
    if (arr.length < 2) return arr;
    let left = [],
        right = [];
    let middle = Math.floor(arr.length / 2);
    let middleVal = arr.splice(middle, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= middleVal) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return sort(left).concat(middleVal, sort(right));
}
