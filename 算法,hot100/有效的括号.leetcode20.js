// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 美团骑行一面问到了

var isValid = function (s) {
    let len = s.length;
    if (len % 2) return false;
    let arr = [];
    for (let i = 0; i < len; i++) {
        switch (s[i]) {
            case "(": {
                arr.push(s[i]);
            }
            case "[": {
                arr.push(s[i]);
            }
            case "{": {
                arr.push(s[i]);
            }
            case ")": {
                if (arr.pop() !== s[i]) return false;
                break;
            }
            case "]": {
                if (arr.pop() !== s[i]) return false;
                break;
            }
            case "}": {
                if (arr.pop() !== s[i]) return false;
                break;
            }
        }
    }
    return !arr.length;
};
