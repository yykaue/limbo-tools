/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/11/29 16:01
 */
import copy from 'copy-text-to-clipboard'

/**
 * 复制到剪贴板
 * @param str 需要复制到剪贴板的内容
 */
function clipboard (str) {
  copy(str)
}

export default clipboard
