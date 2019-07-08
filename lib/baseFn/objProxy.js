/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */

/**
 * 避免js获取不到的属性，发生阻断性错误
 * @param obj 为 Object||Array
 * @param replaceVal 默认显示的值 替代undefined
 * @param exec 执行标识
 * @returns {{}}
 */
function objProxy (obj, replaceVal = '', exec = '_') {
  return new Proxy({}, {
    get: (target, key) => {
      if (key === exec) {
        return obj === undefined ? (replaceVal === '_undefined' ? undefined : replaceVal) : obj
      } else {
        return objProxy(((obj === undefined || obj === null) ? undefined : obj[key]), replaceVal, exec)
      }
    }
  })
}

export default objProxy
