/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
var addTwoNumbers = function (l1, l2) {
    // 创建一个新的空链表
    let res = new ListNode();
    // 将这个空链表赋值给新的值,用于最后返回结果，这个head一直保持着链表的结构，每一次循环都会被添加子节点。
    let head = res;
    // 设置进位
    let addNum = 0;
    // 只要进位是1或者链表1节点不为null或者链表2节点不为null就执行
    while (addNum || l1 || l2) {
        // 如果l1 or l2是空节点，那么需要给他用0占位，不然再下一次循环时，null.val会报错
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;
        // 求和加上上一次求和剩下来的进位
        let sum = val1 + val2 + addNum;
        // 和大于10进位进1
        addNum = sum >= 10 ? 1 : 0;
        // 给新建的链表添加子节点，值是sum % 10因为，9%10得9，11%10得1十位的1会当做进位用在下一次
        res.next = new ListNode(sum % 10);
        // 当前加法结束后，把三个链表都指向下一个子节点
        res = res.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    // 返回head.next，因为head最初保存的第一个子节点是0，并且res在循环中不断的被赋值子节点，最后得到的是最后一次相加的结果，l1&l2最后都是null
    // 按照示例1测试用例： head ---> [0,7,0,8] res ---> [8] l1 ---> null l2 ---> null
    return head.next;
};

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
/**
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例 1：
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

示例 2：
输入：l1 = [0], l2 = [0]
输出：[0]

示例 3：
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
 
提示：
每个链表中的节点数在范围 [1, 100] 内
0 <= Node.val <= 9
题目数据保证列表表示的数字不含前导零
*/
function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}
var addTwoNumbers = function (l1, l2) {
    let res = new ListNode();
    let head = res;
    let addNum = 0;
    while (l1 || l2 || addNum) {
        let val1 = l1 === null ? 0 : l1.val;
        let val2 = l2 === null ? 0 : l2.val;
        let sum = val1 + val2 + addNum;
        addNum = sum >= 10 ? 1 : 0;
        res.next = new ListNode(sum % 10);
        res = res.next;
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return head.next;
};
