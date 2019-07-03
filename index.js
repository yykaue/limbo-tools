/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import deepCopy from './lib/deepCopy'
import getEnv from './lib/getEnv'
import objProxy from './lib/objProxy'
import { setSession, getSession, pushSession } from './lib/sessionFn'

export { deepCopy }
export { getEnv }
export { objProxy }
export { setSession }
export { getSession }
export { pushSession }
export default {
  deepCopy,
  getEnv,
  objProxy,
  setSession,
  getSession,
  pushSession
}
