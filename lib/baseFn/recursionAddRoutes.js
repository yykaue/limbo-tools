/**
 *Created by limbo <yykaue@qq.com> on 2021/7/15.
 */

/**
 * 返回匹配的路由
 * @param routeList
 * @param path
 * @returns {{}}
 */
function recursionAddRoutes (routeList, path) {
  let route = {}
  routeList.some(item => {
    if (!item.hidden) {
      const _path = `${path ? (path + `${item.path ? '/' : ''}`) : ''}${item.path}`
      if (item.children) {
        route = recursionAddRoutes(item.children, _path)
        if (!route._path) {
          // 子集下路由都不存在，寻找下个子集
          return false
        }
      } else {
        route = {
          ...item,
          _path
        }
      }
      return true
    }
  })
  return route
}

export default recursionAddRoutes
