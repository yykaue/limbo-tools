/**
 *Created by limbo <yykaue@qq.com> on 2019/9/8.
 */

/**
 * 数组对象去重
 * @param key type = String
 * @param repeatArr type = [Array]
 */
function unique (key, ...repeatArr) {
  const _map = new Map()
  repeatArr.forEach(itemArr => {
    itemArr.forEach(item => {
      if (!_map.has(item[key])) {
        _map.set(item[key], item)
      }
    })
  })
  return [..._map.values()]
}

export default unique
