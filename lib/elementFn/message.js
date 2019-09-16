/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/9/16.
 */
import { Message } from 'element-ui'

/**
 * message function
 * @param message
 * @param type
 * @param duration
 */
function message (message, type = 'success', duration = 1500) {
  Message({ message, type, duration })
}

export default message
