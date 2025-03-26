/**
 *Created by limbo <yykaue@qq.com> on 2023/7/24.
 */
const pad = s => s.length === 1 ? '0' + s : s

/**
 * 16进制转rgb
 * @param colorHex
 * @returns {[]}
 */
const hexToRgb = (colorHex) => {
  const hexString = colorHex.substr(0, 1) === '#' ? colorHex.substr(1) : colorHex
  let rgbArray = []

  if ([3, 4].includes(hexString.length)) {
    rgbArray = hexString.split('').map(s => 0x11 * parseInt(s, 16))
  } else {
    for (let i = 0; i < hexString.length; i += 2) {
      rgbArray.push(parseInt(hexString.substr(i, 2), 16))
    }
  }
  if (rgbArray.length > 3) {
    rgbArray[3] = Math.round(rgbArray[3] / 255 * 100) / 100
  }
  return rgbArray
}

/**
 * rgb转16进制
 * @param rgbArr
 * @param colorType ['hex', 'hexColor']
 * @returns {*}
 */
const rgbToHex = (rgbArr, colorType = 'hexColor') => {
  let hex = ''
  if (colorType === 'hexColor') {
    hex = '#'
  }
  hex += ((1 << 24) + (rgbArr[0] << 16) + (rgbArr[1] << 8) + rgbArr[2]).toString(16).slice(1)
  if (rgbArr.length > 3) {
    hex += ((1 << 8) + Math.round(rgbArr[3] * 255)).toString(16).slice(1)
  }
  return hex
}

/**
 * 颜色渐变
 * @param startColor
 * @param endColor
 * @param steps
 * @param colorType 输出类型 ['hex', 'hexColor', 'rgb']
 * @returns {[]}
 */
const gradientColors = (startColor, endColor = '#fff', steps = 11, colorType = 'hexColor') => {
  const colorList = []
  let sColor, eColor

  // const normalize = channel => Math.pow(channel / 255, gamma)
  // sColor = parseColor(sColor).map(normalize)
  // eColor = parseColor(eColor).map(normalize)

  if (typeof startColor === 'string') {
    sColor = hexToRgb(startColor)
  } else {
    sColor = [...startColor]
  }
  if (typeof endColor === 'string') {
    eColor = hexToRgb(endColor)
  } else {
    eColor = [...endColor]
  }

  if (sColor.length !== 3 || eColor.length !== 3) {
    if (sColor.length === 3) {
      sColor[3] = 1
    }
    if (eColor.length === 3) {
      eColor[3] = 1
    }
  }

  for (let i = 0; i < steps; i++) {
    const endRate = i / (steps - 1)
    const startRate = 1 - endRate
    let colorHex = ''
    if (colorType === 'hexColor') {
      colorHex = '#'
    }
    const colorArr = []
    for (let j = 0; j < sColor.length; j++) {
      // const stageCount = Math.round(Math.pow(sColor[j] * startRate + eColor[j] * endRate, 1 / gamma) * 255)
      let stageCount
      if (j === 3) {
        stageCount = Math.round((sColor[j] * startRate + eColor[j] * endRate) * 100) / 100
      } else {
        stageCount = Math.round(sColor[j] * startRate + eColor[j] * endRate)
      }
      if (['hex', 'hexColor'].includes(colorType)) {
        if (j === 3) {
          stageCount = Math.round(stageCount * 255)
        }
        colorHex += pad(stageCount.toString(16))
      } else {
        colorArr.push(stageCount)
      }
    }
    if (['hex', 'hexColor'].includes(colorType)) {
      colorList.push(colorHex)
    } else {
      colorList.push(colorArr)
    }
  }
  return colorList
}

export { hexToRgb }
export { rgbToHex }
export { gradientColors }
