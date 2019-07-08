/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */
function getFormItemParams (formItem, exceptList = ['']) {
  let params = {}
  formItem.formList.forEach(item => {
    if (item.val !== undefined && !exceptList.includes(item.val)) {
      params[item.key] = item.val
    }
  })
  return params
}

export default getFormItemParams
