/**
 *Created by limbo <yykaue@qq.com> on 2023/8/24.
 */
import { printInformation, infoColor, infoStyle } from './consoleManage'

/**
 * 流文件转Blob后下载
 */
function downloadBlob (data, headers) {
  let filename = 'download'
  const dispositionList = headers['content-disposition'].split(';')
  dispositionList.some(item => {
    const itemList = item.split('=')
    if (itemList[0] === 'filename') {
      filename = decodeURIComponent(itemList[1])
    }
  })

  const blob = data.constructor === Blob ? data : new Blob([data], { type: headers['content-type'] })
  const fileUrl = window.URL.createObjectURL(blob)

  let a = document.createElement('a')
  a.setAttribute('href', fileUrl)

  const download = (_filename) => {
    if (a) {
      a.setAttribute('download', _filename || filename)
      a.click()
    } else {
      const infoArray = [
        { message: 'downloadBlob:', style: infoStyle(infoColor.danger) },
        { message: '下载链接已销毁' }
      ]
      printInformation(infoArray, true)
    }
    window.URL.revokeObjectURL(fileUrl)
    a = null
  }
  return download
}

export default downloadBlob
