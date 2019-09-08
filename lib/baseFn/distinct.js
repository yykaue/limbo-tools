/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/9/8.
 */

/**
 * 数组对象去重
 * @param key type = String
 * @param repeatArr type = [Array]
 */
function distinct (key, ...repeatArr) {
  let arr = []
  repeatArr.forEach(item => {
    arr.push(...item)
  })
  let keyList = arr.map(item => item[key])
  keyList = [...new Set(keyList)]
  return keyList.map(item => {
    let itemObj
    arr.some(_item => {
      if (_item[key] === item) {
        itemObj = _item
        return true
      }
    })
    return itemObj
  })
}

export default distinct
