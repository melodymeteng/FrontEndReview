var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0, len = nums.length; i < len; i++) {
        // target - nums[i]如果有值，target - 当前循环到的元素值nums[i] 和之前存的值的Key相同说明之前存的某一个值+当前循环到的元素nums[i] = target的
        // 这时返回之前存的值value也就是数组元素的索引和当前i
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i];
        } else {
            //如果没有就把值当key,索引当value存入map
            map.set(nums[i], i);
        }
    }
    return [];
};

/**
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

你可以按任意顺序返回答案。

 

示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]
 */

var twoSum = function (nums, target) {};
