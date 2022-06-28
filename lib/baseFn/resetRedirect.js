/**
 *Created by limbo <yykaue@qq.com> on 2022/6/28.
 */
import checkPath from './checkPath'

/**
 * 给routes 所有父级节点设置redirect
 * @param routes 传入routes
 * @param parentRoute 递归时记录父级及以上的route用
 * @param parentPath 记录的父级path
 */

function resetRedirect (routes, parentRoute = [], parentPath = '') {
  let parentRouteClear = false
  routes.forEach((routeItem, routeIndex) => {
    const redirect = checkPath(parentPath, routeItem.path)

    if (!routeItem.hidden) {
      const _redirect = (routeItem.path && routeItem.path !== redirect) ? `${redirect}/${routeItem.path}` : redirect

      // parentRoute是否需重置
      if (parentRouteClear) {
        if (routeItem.children && routeItem.children.length) {
          resetRedirect(routeItem.children, [routeItem], _redirect)
        }
      } else {
        parentRouteClear = true
        if (routeItem.children && routeItem.children.length) {
          parentRoute.push(routeItem)
          resetRedirect(routeItem.children, parentRoute, _redirect)
        } else {
          // 重写父级以上redirect
          parentRoute.forEach(item => {
            item.redirect = _redirect
          })
        }
      }
    } else if ((routeIndex === routes.length - 1) && !parentRouteClear) {
      // 子集全为hidden，重写父级以上redirect
      parentRoute.forEach(item => {
        item.redirect = redirect
      })
    }
  })
}

export default resetRedirect
