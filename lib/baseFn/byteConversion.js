/**
 *Created by limbo <yykaue@qq.com> on 2024/8/26.
 */

/**
 * byte换算成其他单位
 * @returns {string}
 */
const byteConversion = (size, point = 2) => {
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let byteStr

  for (let i = 0; i < unit.length; i++) {
    if (size < Math.pow(1024, i + 1)) {
      const count = Math.round(size / Math.pow(1024, i) * Math.pow(10, point)) / Math.pow(10, point)
      byteStr = `${count}${unit[i]}`
      break
    }
  }
  return byteStr
}

export default byteConversion
