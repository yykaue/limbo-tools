/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/9/16.
 */

/**
 * 多form表单多级校验
 * @param _vue
 * @param refsData refsList: 注册组件的refs, Array; refsParams: 注册组件的refs的补充,定位到需要校验的组件,下标与refsList对应, Object
 * eg. refsData = [{ refsList: ['form'], refsParams: { 0: [2] } }]
 * @param cb 回调函数
 * @param reject 不满足校验的回调
 * @returns {boolean}
 */
function ruleFormInit (_vue, refsData = [{ refsList: [], refsParams: {} }], cb, reject) {
  let flag = true
  if (!refsData) {
    return flag
  }

  flag = refsData.every(itemForm => {
    let FormRefs = _vue
    itemForm.refsList.forEach((itemRefs, key) => {
      FormRefs = FormRefs.$refs[itemRefs]
      const refsParams = itemForm.refsParams || {}
      if (refsParams[key]) {
        refsParams[key].forEach(_key => {
          FormRefs = FormRefs[_key]
        })
      }
    })

    let itemFormFlag
    FormRefs.validate(valid => {
      itemFormFlag = valid
    })
    return itemFormFlag
  })

  if (flag) {
    cb && cb()
  } else {
    reject && reject()
  }
  return flag
}

export default ruleFormInit
