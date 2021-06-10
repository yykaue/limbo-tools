/**
 *Created by limbo <yykaue@qq.com> on 2019/9/5.
 */
import Cookie from 'js-cookie'

/**
 *
 * @param data
 * @param params
 */
function updateCookie (data, params = { path: '/', expires: 7 }) {
  for (let key in data) {
    Cookie.set(key, data[key], params)
  }
}

export default updateCookie
