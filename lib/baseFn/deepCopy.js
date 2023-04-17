/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */

/**
 * 深复制
 * @param copyObj 需要copy的 Array||Object
 * @returns {{}|Array}
 */
function deepCopy (copyObj) {
  let needCopy
  if (copyObj.constructor === Array) {
    needCopy = []
  } else {
    needCopy = {}
  }
  const stack = [{
    source: copyObj,
    target: needCopy
  }]
  while (stack.length) {
    const { source, target } = stack.shift()
    for (const key in source) {
      const copyItem = source[key]
      if (copyItem && typeof copyItem === 'object') {
        if (copyItem.constructor === Array) {
          target[key] = []
        } else {
          target[key] = {}
        }
        stack.push({
          source: copyItem,
          target: target[key]
        })
      } else {
        target[key] = copyItem
      }
    }
  }
  return needCopy
}
// function deepCopy (copyObj) {
//   let needCopy
//   if (copyObj.constructor === Array) {
//     needCopy = []
//   } else {
//     needCopy = {}
//   }
//   for (let i in copyObj) {
//     if (copyObj[i] && (typeof copyObj[i] === 'object')) {
//       needCopy[i] = deepCopy(copyObj[i])
//     } else {
//       needCopy[i] = copyObj[i]
//     }
//   }
//   return needCopy
// }

export default deepCopy
