/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'

/**
 * 设置session
 * @param name
 * @param list
 * @param update
 * @param paramsMsg
 */
function setSession ({ name, list = [], update = true }, paramsMsg = '') {
  function checkUpdateParams (listFlag, paramsObj) {
    let _params = paramsObj
    if (listFlag) {
      if (update && (typeof paramsMsg === 'object')) {
        if (!_params || (typeof _params !== 'object')) {
          if (paramsMsg.constructor === Array) {
            _params = []
          } else {
            _params = {}
          }
        }
        for (const key in paramsMsg) {
          _params[key] = paramsMsg[key]
        }
      } else {
        _params = paramsMsg
      }
    } else if (!_params || (typeof _params !== 'object')) {
      _params = {}
    }
    return _params
  }

  let params = getSession({ name })
  params = checkUpdateParams(!list.length, params)

  list.reduce((acc, cur, i, arr) => {
    acc[cur] = checkUpdateParams(i === arr.length - 1, acc[cur])
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
  const sessionStr = sessionStorage.getItem(name)
  let params
  if (sessionStr === null) {
    params = sessionStr
  } else {
    const Base64Decode = Base64.decode(sessionStr)
    params = JSON.parse(Base64Decode)
  }

  if (list.length && (!params || typeof params !== 'object')) {
    params = {}
  }
  return list.reduce((acc, cur, i, arr) => {
    if ((i !== arr.length - 1) && (!acc[cur] || typeof acc[cur] !== 'object')) {
      acc[cur] = {}
    }
    return acc[cur]
  }, params)
}

export { setSession }
export { getSession }
