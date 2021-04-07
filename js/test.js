var str = readline();
var obj = {};
for (var i = 0; i < str.length; i++) {
  obj[str[i]] = obj[str[i]] + 1 || 1;
}
var result = objSort(obj);
var string = '';
for (var i in result) {
  string += i + ':' + result[i] + ';';
}
print(string);
function objSort(obj) {
  if (typeof obj !== 'object') return new TypeError('arguments is not Object');
  var newKey = Object.keys(obj).sort(function (key1, key2) {
    return obj[key2] - obj[key1];
  });
  var newObj = {};
  for (var i = 0; i < newKey.length; i++) {
    newObj[newKey[i]] = obj[newKey[i]];
  }
  return newObj;
}
