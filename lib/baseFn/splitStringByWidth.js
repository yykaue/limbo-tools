/**
 *Created by limbo <yykaue@qq.com> on 2023/7/11.
 */
import getTextWidthByCanvas from './getTextWidthByCanvas'

/**
 * 根据宽度切割字符串
 * @param checkString
 * @param splitWidth
 * @param font
 * @returns {{standardString, lastString, textWidth: string}}
 */
function splitStringByWidth (checkString, splitWidth, font) {
  const textWidth = getTextWidthByCanvas(checkString, font)
  let tempStr = checkString.slice(0, ~~(checkString.length * splitWidth / textWidth))
  let tempStrWidth = getTextWidthByCanvas(tempStr, font)
  let standardString, lastString

  if (tempStrWidth <= splitWidth) {
    while (tempStrWidth <= splitWidth) {
      tempStr = checkString.slice(0, tempStr.length + 1)
      tempStrWidth = getTextWidthByCanvas(tempStr, font)
    }
    standardString = checkString.slice(0, tempStr.length - 1)
    lastString = checkString.slice(tempStr.length - 1)
  } else {
    while (tempStrWidth > splitWidth) {
      tempStr = checkString.slice(0, (tempStr.length - 1))
      tempStrWidth = getTextWidthByCanvas(tempStr, font)
    }
    standardString = checkString.slice(0, tempStr.length)
    lastString = checkString.slice(tempStr.length)
  }
  return {
    standardString,
    lastString,
    textWidth
  }
}

export default splitStringByWidth
