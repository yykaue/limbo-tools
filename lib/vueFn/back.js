/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/8.
 */

/**
 * 返回 路由记录默认 -1
 * @param _vue
 */
function back (_vue, num = -1) {
  _vue.$router.back(num)
}

export default back
