/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'

/**
 * 设置session
 * @param name
 * @param key1
 * @param key2
 * @param obj
 */
function setSession ({ name, key1, key2 }, obj) {
  let msg = getSession({ name: name })

  if (key1 && !msg) msg = {}
  if (key2 && !msg[key1]) msg[key1] = {}

  if (key2) {
    msg[key1][key2] = obj
  } else if (key1) {
    msg[key1] = obj
  } else {
    msg = obj
  }

  let str = JSON.stringify(msg)
  let strBase64 = Base64.encode(str)

  sessionStorage.setItem(name, strBase64)
}

/**
 * 获取session
 * @param name
 * @param key1
 * @param key2
 * @returns {any}
 */
function getSession ({ name, key1, key2 }) {
  let str, obj

  if (sessionStorage.getItem(name) == null) {
    str = sessionStorage.getItem(name)
  } else {
    str = Base64.decode(sessionStorage.getItem(name))
  }

  if (key2 && JSON.parse(str) && JSON.parse(str)[key1]) {
    obj = JSON.parse(str)[key1][key2]
  } else if (key1 && JSON.parse(str)) {
    obj = JSON.parse(str)[key1]
  } else {
    obj = JSON.parse(str)
  }

  return obj
}

/**
 * 更新session
 * @param name
 * @param key1
 * @param key2
 * @param obj
 */
function pushSession ({ name, key1, key2 }, obj) {
  let msg = getSession({ name: name })

  if (!msg) msg = {}
  if (key1 && !msg[key1]) msg[key1] = {}
  if (key2 && !msg[key1][key2]) msg[key1][key2] = {}

  for (let key in obj) {
    if (key2) {
      msg[key1][key2][key] = obj[key]
    } else if (key1) {
      msg[key1][key] = obj[key]
    } else {
      msg[key] = obj[key]
    }
  }

  setSession({ name: name }, msg)
}

export { setSession }
export { getSession }
export { pushSession }
