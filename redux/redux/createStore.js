/*
  changeState对应的就是dispatch，plan对应的就是reducer
*/

const createStore = function(plan, initState) {
  let state = initState;
  let listeners = [];
  function subscribe(listener) {
    listeners.push(listener);
  }
  function changeState(action) {
    state = plan(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function getState() {
    return state;
  }
  return {
    subscribe,
    changeState,
    getState
  };
};
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    desc: ''
  }
};
function plan(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.counter.count++
      };
    case 'del':
      return {
        ...state,
        count: state.counter.count--
      };

    default:
      return state;
  }
}
let store = createStore(plan, initState);
store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.info.name}:${state.info.desc}`);
});
store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});
store.changeState({
  ...store.getState(),
  info: {
    name: 'zhangsan',
    desc: 'shabi'
  }
});
store.changeState({
  type: 'add'
});
