/**
 *Created by limbo <yykaue@qq.com> on 2019/7/8.
 */
import { setSession } from '../baseFn'

/**
 * 记录当前路由 参数
 * @param _vue
 * @param recordParams
 * @param update
 */
function record (_vue, recordParams, update = true) {
  const params = {
    recordFlag: true,
    recordParams
  }
  setSession({ name: _vue.$route.name, update }, params)
}

export default record
