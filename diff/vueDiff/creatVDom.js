class VirdualElement {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    if (props.key) {
      this.key = props.key;
    }
    let count = 0;
    this.children.forEach((child, index) => {
      if (child instanceof VirdualElement) {
        count += child.count;
      } else {
        children[index] = '' + child;
      }
      count++;
    });
    this.count = count;
  }
  renderer() {
    let el = document.createElement(this.tagName);
    let props = this.props;
    for (let propsName in props) {
      var propsValue = props[propsName];
      el.setAttribute(propsName, propsValue);
    }
    var children = this.children || [];
    children.forEach(child => {
      let childEl =
        child instanceof VirdualElement
          ? child.renderer()
          : document.createTextNode(child);
      el.appendChild(childEl);
    });
    return el;
  }
}
var el = new VirdualElement('div', { id: 'virtual-dom' }, [
  new VirdualElement('p', {}, ['Virtual DOM']),
  new VirdualElement('ul', { id: 'list' }, [
    new VirdualElement('li', { class: 'item' }, ['Item 1']),
    new VirdualElement('li', { class: 'item' }, ['Item 2']),
    new VirdualElement('li', { class: 'item' }, ['Item 3'])
  ]),
  new VirdualElement('div', {}, ['Hello World'])
]);
var ell = el.renderer();
document.body.appendChild(ell)
console.log(ell);

console.log('start')
setTimeout(()=>{
  console.log(2)
  Promise.resolve().then(()=>{
    console.log(3)
  })
},1000)
new Promise((resolve,reject)=>{
  console.log(4)
  setTimeout(()=>{
    console.log(5)
    resolve(6)
  },0)
}).then((res)=>{
  console.log(7)
  setTimeout(()=>{
    console.log(res)
  },500)
})



