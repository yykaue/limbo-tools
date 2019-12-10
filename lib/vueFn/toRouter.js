/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */
import { pushSession } from '../baseFn'

/**
 *  跳转路由 及 携带的参数
 * @param _vue
 * @param routerName  路由name
 * @param routerObj   路由携带参数
 * @param params      动态路由传参
 */
function toRouter (_vue, routerName, routerObj, params) {
  const routerParams = {
    recordFlag: false,
    ...routerObj
  }

  if (routerObj) {
    pushSession({ name: routerName }, routerParams)
  }

  _vue.$router.push({
    name: routerName,
    params
  })
}

export default toRouter
