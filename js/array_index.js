import ARRAY_MAP from './Array_api/map';
import ARRAY_REDUCE from './Array_api/reduce';
import ARRAY_FILTER from './Array_api/filter';
import reduceCommonUse from './Array_apiTest/reduceTest'
const TEST_DATA = {
  mapData: [1, 2, 3, 4, 5],
  reduceData: [2, 4, 5, 1, 6],
};

TEST_DATA.mapData.ARRAY_MAP((item, index) => {
  // console.log('item',item,index)
});
TEST_DATA.reduceData.ARRAY_REDUCE((prev, cur, index, arr) => {
  // console.log('prev,cur,index', prev, cur, index);
  return prev + cur;
});
let res = TEST_DATA.mapData.ARRAY_FILTER((item, index) => {
  return item>2
});
console.log(res)
// reduceCommonUse.moreToOne();
