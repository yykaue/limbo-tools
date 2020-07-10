/**
 *Created by limbo <yangyuke@hetao101.com> on 2020/7/7 17:57
 */

/**
 * 设置背景水印
 * @param width
 * @param height
 * @param originWidth
 * @param originHeight
 * @param deg
 * @param font
 * @param color
 * @param text
 * @param sheetName
 * @param className
 * @param type
 * @param repeat
 * @param important
 */
function setWatermark (
  {
    width = 300,
    height = 200,
    originWidth = 10,
    originHeight = 200,
    deg = -30,
    font = '24px \\5FAE\\8F6F\\96C5\\9ED1',
    color = 'rgba(62, 61, 50, 0.1)',
    text = '',
    sheetName = 'limboStylesheet',
    className = '.bg-watermark',
    type = 'create',
    repeat = 'repeat',
    important = true
  }) {
  let style = document.getElementById(sheetName)
  if (!style) {
    style = document.createElement('style')
    style.id = sheetName
    style.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(style)
  }
  const sheet = style.sheet
  let flag
  for (let k in sheet.rules) {
    if (!['length', 'item'].includes(k) && sheet.rules[k].selectorText === className) {
      flag = true
      if (['update', 'delete'].includes(type)) {
        sheet.deleteRule(k)
        flag = false
      }
      break
    }
  }

  if (!flag && ['create', 'update'].includes(type)) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.translate(originWidth, originHeight)
    ctx.fillStyle = color
    ctx.font = font
    ctx.rotate(deg * Math.PI / 180)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'bottom'
    ctx.fillText(text, 0, 0)
    const url = canvas.toDataURL('image/png')
    sheet.addRule(className, `background-image: url(${url}) ${important ? '!important' : ''}`)
    sheet.addRule(className, `background-repeat: ${repeat} ${important ? '!important' : ''}`)
  }
}

export default setWatermark
