/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/7/3.
 */

/**
 *
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
