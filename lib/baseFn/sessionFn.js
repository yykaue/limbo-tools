/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'

/**
 * 设置session
 * @param name
 * @param list
 * @param update
 * @param obj
 */
function setSession ({ name, list = [], update = true }, obj) {
  let params = getSession({ name: name })
  if (!params && list) { params = {} }

  list.reduce((acc, cur, i, arr) => {
    if (i === arr.length - 1) {
      if (update) {
        for(let key in obj) {
          acc[cur][key] = obj[key]
        }
      } else {
        acc[cur] = obj
      }
    } else if (!acc[cur]) {
      acc[cur] = {}
    }
    return acc[cur]
  }, params)

  const str = JSON.stringify(params)
  const strBase64 = Base64.encode(str)
  sessionStorage.setItem(name, strBase64)
}

/**
 * 获取session
 * @param name
 * @param list
 * @returns {*}
 */
function getSession ({ name, list = [] }) {
  let sessionStr = sessionStorage.getItem(name)
  let params
  if (sessionStr === null) {
    params = sessionStr
  } else {
    const Base64Decode = Base64.decode(sessionStr)
    params = JSON.parse(Base64Decode)
  }

  if (!params && list) { params = {} }

  return list.reduce((acc, cur, i, arr) => {
    if ((i !== arr.length - 1) && !acc[cur]) {
      acc[cur] = {}
    }
    return acc[cur]
  }, params)
}

export { setSession }
export { getSession }
