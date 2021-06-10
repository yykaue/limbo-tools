/**
 *Created by limbo <yykaue@qq.com> on 2020/4/14 15:57
 */

/**
 * 设置current正确回显,设置total
 * @param paging type: Object
 * @param current type: Number
 * @param total type: Number
 */
function setPaging (paging = { total: 0, params: { current: 1 }}, current, total) {
  paging.total = total
  paging.params.current = 1
  setTimeout(() => {
    paging.params.current = current
  })
}

export default setPaging
