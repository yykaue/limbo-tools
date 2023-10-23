/**
 *Created by limbo <yykaue@qq.com> on 2023/10/23.
 */

/**
 * URL参数拼接
 * @param url 需要拼接的URL
 * @param query 需要拼接的参数
 * @returns {*}
 */

const splicingUrl = (url, query = '') => {
  const reg = /\?/
  let splicingStr = '?'
  if (reg.test(url)) {
    splicingStr = '&'
  }
  return query ? `${url}${splicingStr}${query}` : url
}

export default splicingUrl
