/**
 *Created by limbo <yykaue@qq.com> on 2022/6/28.
 */
import resolvePath from './resolvePath'

/**
  * 给routes 所有父级节点设置redirect
  * @param routes 传入routes
  */

function resetRedirect (routes) {
  const stack = [{
    checkRoutes: routes,
    parentRoute: [], // 迭代时记录父级及以上的route用
    parentPath: '' // 记录的父级path
  }]
  while (stack.length) {
    let { checkRoutes, parentRoute, parentPath } = stack.shift()
    const stackRoutes = [...checkRoutes]
    // 父级及以上路由的redirect需修改标识
    let parentRouteRedirect = true

    while (stackRoutes.length) {
      const routeItem = stackRoutes.shift()
      const redirect = resolvePath(parentPath, routeItem.path)

      if (routeItem.hidden) {
        if (stackRoutes.length === 0 && parentRouteRedirect) {
          parentRoute.forEach(item => {
            // 路由重定向到自己，死循环
            item.redirect = item._redirect === parentPath ? undefined : parentPath
          })
        }
        continue
      }
      // 自定义字段 当前完整path 等同于fullpath
      routeItem._redirect = redirect

      if (routeItem.children && routeItem.children.length) {
        if (parentRouteRedirect) {
          parentRoute.push(routeItem)
        } else {
          parentRoute = [routeItem]
        }

        stack.push({
          checkRoutes: [...routeItem.children],
          parentRoute,
          parentPath: redirect
        })
      } else if (parentRouteRedirect) {
        parentRoute.forEach(item => {
          item.redirect = redirect
        })
      }

      parentRouteRedirect = false
    }
  }
}

export default resetRedirect
