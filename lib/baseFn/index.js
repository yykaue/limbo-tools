/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */
import deepCopy from './deepCopy'
import getEnv from './getEnv'
import getFormItemParams from './getFormItemParams'
import objProxy from './objProxy'
import { setSession, getSession, pushSession } from './sessionFn'

export { deepCopy }
export { getEnv }
export { getFormItemParams }
export { objProxy }
export { setSession }
export { getSession }
export { pushSession }
export default {
  deepCopy,
  getEnv,
  getFormItemParams,
  objProxy,
  setSession,
  getSession,
  pushSession
}
