/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */

/**
 *
 * @param obj
 * @param replaceVal
 * @param exec
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
