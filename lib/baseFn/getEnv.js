/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */

/**
 * 获取 当前url的环境
 * @returns {string}
 */
function getEnv () {
  let ENV = ''
  location.host.split('.').some(item => {
    if (item.includes('testing')) {
      ENV = item + '.'
      return true
    }
  })
  return ENV
}

export default getEnv
