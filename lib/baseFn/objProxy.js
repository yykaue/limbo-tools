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
/**
 * 避免js获取不到的属性，发生阻断性错误
 * @param obj 为 Object||Array
 * @param replaceVal 默认显示的值 替代undefined
 * @param replaceList 为Array 匹配需要替换的值
 * @param exec 执行标识
 * @returns {{}}
 */
function objProxy (obj, replaceVal = '', replaceList = [undefined], exec = '_') {
  return new Proxy({}, {
    get: (target, key) => {
      if (key === exec) {
        return replaceList.includes(obj) ? replaceVal : obj
      } else {
        return objProxy(([undefined, null].includes(obj) ? undefined : obj[key]), replaceVal, replaceList, exec)
      }
    }
  })
}

export default objProxy
