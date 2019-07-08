/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'
import Cookie from 'js-cookie'
import Md5 from 'md5.js'
import Moment from 'moment'
import Qs from 'qs'

Moment.locale('zh-cn')

import baseFn from './lib/baseFn'
import vueFn from './lib/vueFn'

export { Base64 }
export { Cookie }
export { Md5 }
export { Moment }
export { Qs }
export { baseFn }
export { vueFn }
export default {
  Base64,
  Cookie,
  Md5,
  Moment,
  Qs,
  ...baseFn,
  ...vueFn
}
