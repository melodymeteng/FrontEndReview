
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 创建一个空数组 设定一个最大值0，最后会取之前的最大值还是数组的长度，数组就是一个滑动窗口
    // abcbbccc 在到第4次循环的时候，arr = ['a','b','c'],max = 3,这时s[i] = 'b'，arr里是有b的，所以把arr中所有b之前的数据包含b全部截掉,
    // splice(start,del长度)，indexOf得到的是索引+1就是长度，此时arr = ['c']，对max求最大值还是上次记录的3。
    let arr = [];
    let max = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        let index = arr.indexOf(s[i]);
        if (index !== -1) {
            arr.splice(0, index + 1);
        }
        arr.push(s.charAt(i));
        max = Math.max(arr.length, max);
    }
    return max;
};
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

//

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// 示例 4:

// 输入: s = ""
// 输出: 0
//

// 提示：

// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成
var lengthOfLongestSubstring = function (s) {
   
};
