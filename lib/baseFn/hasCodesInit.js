/**
 *Created by limbo <yykaue@qq.com> on 2020/4/30.
 */

/**
 *
 * @param codes 权限码控制   类型：Array
 * @param roles 角色控制     类型：Array
 * @param strict
 * @returns {*}
 */
function hasCodesInit ({ codes, codesList, roles, rolesList, loginType, strict = false, }) {
  let flag = false
  let traversalType = 'some'
  if (strict) {
    traversalType = 'every'
  }

  let permissionStr
  let permissionList = []
  if (loginType === 1) {
    permissionStr = 'roles'
    if (!roles) {
      return true
    }
    permissionList = roles
  } else if (loginType === 2) {
    permissionStr = 'permissionCodeList'
    if (!codes) {
      return true
    }
    permissionList = codes
  }
  flag = permissionList[traversalType](item => {
    if (store.state.user[permissionStr].includes(item)) {
      return true
    }
  })
  return flag
}

export default hasCodesInit
