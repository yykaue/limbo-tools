/**
 *Created by limbo <yykaue@qq.com> on 2019/9/16.
 */

/**
 * 多form表单多级校验重置
 * @param _vue
 * @param refsData refsList: 注册组件的refs, Array; refsSub: 注册组件的refs下标的补充,定位到需要校验的组件,下标与refsList对应, Object
 * eg. refsData = [{ refsList: ['form'], refsSub: { 0: [2] } }]
 */
function resetForm (_vue, refsData = [{ refsList: [], refsSub: {} }]) {
  refsData.forEach(itemForm => {
    let FormRefs = _vue
    itemForm.refsList.forEach((itemRefs, key) => {
      FormRefs = FormRefs.$refs[itemRefs]
      const refsSub = itemForm.refsSub || {}
      if (refsSub[key]) {
        refsSub[key].forEach(_key => {
          FormRefs = FormRefs[_key]
        })
      }
    })

    FormRefs.resetFields()
  })
}

export default resetForm
