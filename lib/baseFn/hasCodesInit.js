/**
 *Created by limbo <yykaue@qq.com> on 2020/4/30.
 */

/**
 * 拥有权限初始化
 * @param permission type: Array, [{ codesList: [], checkType: '' }] codesList:需要被校验的数组,checkType:被校验的类型
 * @param hasCodesList 校验的数组
 * @param checkType 校验的类型
 * @param strict 严格模式
 * @returns {*}
 */
function hasCodesInit (permission = [{ codesList: [], checkType: '' }], hasCodesList = [], checkType = '', strict = false) {
  const checkPermission = permission.find(item => item.checkType === checkType) || { codesList: [] }
  let traversalType = 'some'
  if (strict) {
    traversalType = 'every'
  }

  return hasCodesList[traversalType](item => checkPermission.codesList.includes(item))
}

export default hasCodesInit
