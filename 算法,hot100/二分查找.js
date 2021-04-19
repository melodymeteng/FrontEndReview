function search(arr, target) {
    let min = 0,
        max = arr.length;
    while (min < max) {
        let mid = Math.floor((min + max) / 2);
        if (target < arr[mid]) {
            max = mid - 1;
        } else if (target > arr[i]) {
            min = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
