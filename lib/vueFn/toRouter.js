/**
 *Created by limbo <yykaue@qq.com> on 2019/7/8.
 */
import { setSession } from '../baseFn'

/**
 *
 *  跳转路由 及 携带的参数
 * @param _vue
 * @param routerName  路由name
 * @param routerObj   路由携带参数
 * @param params      动态路由传参
 * @param update      session是否只更新（或重置）
 */
function toRouter (_vue, routerName, routerObj, params, update = true) {
  const routerParams = {
    recordFlag: false,
    ...routerObj
  }

  if (routerObj) {
    setSession({ name: routerName, update }, routerParams)
  }

  _vue.$router.push({
    name: routerName,
    params
  })
}

export default toRouter
