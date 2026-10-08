/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */

/**
 * 深复制
 * @param copyObj 需要copy的 Array||Object
 * @returns {{}|Array}
 */
function deepCopy (copyObj) {
  const needCopy = copyObj.constructor === Array ? [] : {}
  let head = {
    source: copyObj,
    target: needCopy,
    next: null
  }
  let tail = head
  // 链式队列保持广度优先顺序，并避免保留已消费的数组槽位。
  while (head) {
    const { source, target } = head
    for (const key in source) {
      const copyItem = source[key]
      if (copyItem && typeof copyItem === 'object') {
        target[key] = copyItem.constructor === Array ? [] : {}
        // head 和 tail 指向同一节点时，修改 tail.next 也会修改 head.next。
        // 因此循环末尾的 head = head.next 能访问刚入队的节点。
        tail.next = {
          source: copyItem,
          target: target[key],
          next: null
        }
        tail = tail.next // 仅移动尾指针，head 仍指向当前处理的节点。
      } else {
        target[key] = copyItem
      }
    }
    head = head.next // 已处理节点不再被队列引用，可由垃圾回收器回收。
  }
  return needCopy
}

export default deepCopy
