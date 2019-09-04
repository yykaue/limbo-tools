/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */

/**
 *
 * @param formItem
 * @param exceptList 需要被过滤的字段 type: Array
 * @param filterList 需要被过滤的formList属性 type: Array
 */
function getFormItemParams (formItem, exceptList = [''], filterList = [{ key: 'val', val: [undefined] }]) {
  let params = {}
  formItem.formList.forEach(item => {
    const flag = filterList.some(_item => {
      return _item.val.includes(item[_item.key])
    })
    if (item.val !== undefined && !exceptList.includes(item.val) && !flag) {
      params[item.key] = item.val
    }
  })
  return params
}

export default getFormItemParams
