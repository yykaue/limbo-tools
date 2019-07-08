/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */
import { pushSession } from '../baseFn'

/**
 *  跳转路由 及 携带的参数
 * @param _vue
 * @param routerName  路由name
 * @param routerObj   路由携带参数
 * @param type        是否为 record 方式
 */
function toRouter (_vue, routerName, routerObj, type) {
  const routerParams = {
    recordFlag: !!type,
    ...routerObj
  }

  if (routerObj) {
    pushSession({ name: routerName }, routerParams)
  }

  _vue.$router.push({
    name: routerName
  })
}

export default toRouter
