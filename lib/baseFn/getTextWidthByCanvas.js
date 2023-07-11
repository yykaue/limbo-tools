/**
 *Created by limbo <yykaue@qq.com> on 2023/7/7.
 */

/**
 * 获取 计算字符串在dom中的宽度
 * @returns {string}
 */
function getTextWidthByCanvas (text = '', font) {
  // const font = getComputedStyle(dom).font
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

export default getTextWidthByCanvas
