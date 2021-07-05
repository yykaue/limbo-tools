/**
 *Created by limbo <yykaue@qq.com> on 2019/7/3.
 */
import { Base64 } from 'js-base64'
import Clipboard from 'copy-text-to-clipboard'
import Cookie from 'js-cookie'
import CryptoJS from 'crypto-js'
import DomToImg from 'dom-to-image'
import FileSaver from 'file-saver'
import Md5 from 'md5.js'
import Moment from 'moment'
import Qs from 'qs'

Moment.locale('zh-cn')

import baseFn from './lib/baseFn'
import elementFn from './lib/elementFn'
import vueFn from './lib/vueFn'

export {
  Base64,
  Clipboard,
  Cookie,
  CryptoJS,
  DomToImg,
  FileSaver,
  Md5,
  Moment,
  Qs,
  baseFn,
  elementFn,
  vueFn
}
export default {
  Base64,
  Clipboard,
  Cookie,
  CryptoJS,
  DomToImg,
  FileSaver,
  Md5,
  Moment,
  Qs,
  ...baseFn,
  ...elementFn,
  ...vueFn
}
