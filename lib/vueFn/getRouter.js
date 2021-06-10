/**
 *Created by limbo <yykaue@qq.com> on 2019/7/8.
 */
import { getSession } from '../baseFn'

/**
 *  获取当前路由的 参数信息
 * @param _vue
 * @returns {any}
 */
function getRouter (_vue) {
  return getSession({ name: _vue.$route.name })
}

export default getRouter
