/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */

/**
 * 记录当前路由 参数
 * @param _vue
 * @param recordParams
 */
function record (_vue, recordParams) {
  const params = {
    recordFlag: true,
    recordParams
  }
  this.pushSession({ name: _vue.$route.name }, params)
}

export default record
