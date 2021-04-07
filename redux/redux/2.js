/*
  changeState对应的就是dispatch，plan对应的就是reducer
*/

const createStore = function(reducer) {
  let state ;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function getState() {
    return state;
  }
  //调用的时候自己初始化initState，这样不用传入initState
  dispatch({ type: Symbol() });
  return {
    subscribe,
    dispatch,
    getState
  };
};
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: 'zhangsan',
    desc: 'shabi'
  }
};
function counter(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'add':
      var obj = {
        ...state,
        count: state.count + 1
      };
      return obj;
    case 'del':
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}
function info(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'set_name':
      return {
        ...state,
        name: action.name
      };
    case 'set_desc':
      return {
        ...state,
        desc: action.desc
      };
    default:
      return state;
  }
}
const reducer = combineReducer({
  counter: counter,
  info: info
});
function combineReducer(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combination(state = {}, action) {
    let nextState = {};
    reducerKeys.map((key, i) => {
      //reducer就是对应的处理状态的函数
      const reducer = reducers[key];
      //prevStateForKey就是要更改的上一次state的值
      const prevStateForKey = state[key];
      //更改完后的值
      const nextStateForKey = reducer(prevStateForKey, action);
      //初始化的时候，prevStateForKey是undefined
      if (prevStateForKey) {
        nextState[key] = nextStateForKey;
      } else {
        nextState[key] = nextStateForKey[key];
      }
    });
    return nextState;
  };
}
let store = createStore(reducer);
store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.info.name}:${state.info.desc}`);
});
store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});
store.dispatch({
  type: 'add'
});

store.dispatch({
  type: 'del'
});
store.dispatch({
  type: 'set_name',
  name: 'goudan'
});
