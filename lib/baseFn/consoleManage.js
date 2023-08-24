/**
 *Created by limbo <yykaue@qq.com> on 2023/7/24.
 */
import { gradientColors } from './colorManage'

const infoColor = {
  primary: '#409EFF',
  success: '#67C23A',
  warning: '#E6A23C',
  danger: '#F56C6C',
  info: '#909399',
  primaryBlack: '#303133',
  regular: '#606266',
  secondary: '#909399',
  placeholder: '#C0C4CC',
  borderBase: '#DCDFE6',
  borderLight: '#E4E7ED',
  borderLighter: '#EBEEF5',
  borderExtralight: '#F2F6FC',
  transparent: 'transparent',
  black: '#000',
  white: '#fff'
}

// styleType: ['default', 'plain']
const infoStyle = (color = '#409EFF', styleType = 'default') => {
  let style = 'margin:0 3px;padding:3px;'
  if (styleType === 'default') {
    style += `color:#fff;background:${color};border:1px solid ${color};border-radius:3px;`
  } else if (styleType === 'plain') {
    const colors = gradientColors(color)
    style += `color:${color};background:${colors[9]};border:1px solid ${colors[6]};border-radius:3px;`
  } else {
    style += 'color:#606266;background:transparent;border:1px solid #DCDFE6;border-radius:3px;'
  }
  return style
}

const printInformation = (infoArray = [], privateFlag) => {
  let messageString = ''
  const styleArray = []
  const originalArray = []
  if (privateFlag) {
    messageString += '%climbo-tools'
    styleArray.push('padding:5px;color:#fadfa3;background:#030307;border:1px solid #fff;border-radius:5px;')
  }

  infoArray.forEach(item => {
    if (item.type === 'original') {
      originalArray.push(item.message)
    } else {
      messageString += '%c' + item.message
      styleArray.push(item.style)
    }
  })
  console.log(messageString, ...styleArray, ...originalArray)
}

export { infoColor }
export { infoStyle }
export { printInformation }
