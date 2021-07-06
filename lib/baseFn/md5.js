/**
 *Created by limbo <yykaue@qq.com> on 2021/7/6.
 */
import Md5JS from 'md5.js'

/**
 * md5加密
 * @param message type String
 * @returns {Promise<ArrayBuffer>}
 */
function md5 (message = '') {
  return new Md5JS().update(message).digest('hex')
}

export default md5
