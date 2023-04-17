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
    let redirectPath
    const externalFlag = isExternal(routeItem.path)

    const reg = /^\//
    if (externalFlag) {
      redirectPath = '/'
    } else if (reg.test(routeItem.path)) {
      redirectPath = routeItem.path
    } else {
      `${parentPath}/${routeItem.path}`
    }

    if (!externalFlag && !whitePath.includes(routeItem.path)) {
      const reg = pathToRegexp(parentPath)
      routeRegexpList.push(reg)
    }
    if (routeItem.children && routeItem.children.length) {
      getRouteRegexpList(routeItem.children, routeRegexpList, parentPath)
    }
  })
}

function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default getRouteRegexpList