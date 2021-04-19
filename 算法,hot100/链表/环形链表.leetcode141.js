var hasCycle = (head) => {
    let map = new Map();
    while (head) {
        if (map.has(head)) return true;
        map.set(head, true); // 存的是节点的地址引用，而不是节点值
        head = head.next;
    }
    return false;
};
