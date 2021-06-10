/**
 *Created by limbo <yykaue@qq.com> on 2019/12/10 12:44
 */

/**
 * 获取当前操作系统
 * @returns {string}
 */
function detectOS () {
  const sUserAgent = navigator.userAgent
  let OS
  if (['Win32', 'Windows'].includes(navigator.platform)) {

    if (sUserAgent.includes('Windows NT 5.0') || sUserAgent.includes('Windows 2000')) {
      OS = 'Windows2000'
    } else if (sUserAgent.includes('Windows NT 5.1') || sUserAgent.includes('Windows XP')) {
      OS = 'WindowsXP'
    } else if (sUserAgent.includes('Windows NT 5.2') || sUserAgent.includes('Windows 2003')) {
      OS = 'Windows2003'
    } else if (sUserAgent.includes('Windows NT 6.0') || sUserAgent.includes('Windows Vista')) {
      OS = 'Windows Vista'
    } else if (sUserAgent.includes('Windows NT 6.1') || sUserAgent.includes('Windows 7')) {
      OS = 'Windows7'
    } else if (sUserAgent.includes('Windows NT 10.0') || sUserAgent.includes('Windows 10')) {
      OS = 'Windows10'
    } else {
      OS = 'Windows other'
    }

  } else if (['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(navigator.platform)) {
    OS = 'MacOS'
  } else if (navigator.platform === 'X11') {
    OS = 'Unix'
  } else if (String(navigator.platform).includes('Linux')) {
    OS = 'Linux'
  } else {
    OS = 'other'
  }
  return OS
}

export default detectOS
