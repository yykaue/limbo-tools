/**
 *Created by limbo <yykaue@qq.com> on 2022/6/28.
 */
 import { pathToRegexp } from 'path-to-regexp'
 import checkPath from './checkPath'

/**
 * 获取每个路由节点的正则表达式
 * @param routes
 * @param routeRegexpList 传入记录route正则的Array
 * @param parentPath 记录的父级path
 * @param whitePath 外名单path
 */

function getRouteRegexpList (routes, routeRegexpList = [], parentPath = '', whitePath = ['*']) {
  routes.forEach(routeItem => {
    const redirect = checkPath(parentPath, routeItem.path)
    const _redirect = (routeItem.path && routeItem.path !== redirect) ? `${redirect}/${routeItem.path}` : redirect
    if (!whitePath.includes(routeItem.path)) {
      const reg = pathToRegexp(_redirect)
      routeRegexpList.push(reg)
    }
    if (routeItem.children && routeItem.children.length) {
      getRouteRegexpList(routeItem.children, routeRegexpList, _redirect)
    }
  })
}

export default getRouteRegexpList
