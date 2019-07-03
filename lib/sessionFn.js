/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'

/**
 *
 * @param nameObj
 * @param obj
 */
function setSession (nameObj, obj) {
  let msg = getSession({ name: nameObj.name })

  if (nameObj.key1 && !msg) msg = {}
  if (nameObj.key2 && !msg[nameObj.key1]) msg[nameObj.key1] = {}

  if (nameObj.key2) {
    msg[nameObj.key1][nameObj.key2] = obj
  } else if (nameObj.key1) {
    msg[nameObj.key1] = obj
  } else {
    msg = obj
  }

  let str = JSON.stringify(msg)
  let strBase64 = Base64.encode(str)

  sessionStorage.setItem(nameObj.name, strBase64)
}

/**
 *
 * @param nameObj
 * @returns {any}
 */
function getSession (nameObj) {
  let str, obj

  if (sessionStorage.getItem(nameObj.name) == null) {
    str = sessionStorage.getItem(nameObj.name)
  } else {
    str = Base64.decode(sessionStorage.getItem(nameObj.name))
  }

  if (nameObj.key2 && JSON.parse(str) && JSON.parse(str)[nameObj.key1]) {
    obj = JSON.parse(str)[nameObj.key1][nameObj.key2]
  } else if (nameObj.key1 && JSON.parse(str)) {
    obj = JSON.parse(str)[nameObj.key1]
  } else {
    obj = JSON.parse(str)
  }

  return obj
}

/**
 *
 * @param nameObj
 * @param obj
 */
function pushSession (nameObj, obj) {
  let msg = getSession({ name: nameObj.name })

  if (!msg) msg = {}
  if (nameObj.key1 && !msg[nameObj.key1]) msg[nameObj.key1] = {}
  if (nameObj.key2 && !msg[nameObj.key1][nameObj.key2]) msg[nameObj.key1][nameObj.key2] = {}

  for (let key in obj) {
    if (nameObj.key2) {
      msg[nameObj.key1][nameObj.key2][key] = obj[key]
    } else if (nameObj.key1) {
      msg[nameObj.key1][key] = obj[key]
    } else {
      msg[key] = obj[key]
    }
  }

  setSession({ name: nameObj.name }, msg)
}

export { setSession }
export { getSession }
export { pushSession }
