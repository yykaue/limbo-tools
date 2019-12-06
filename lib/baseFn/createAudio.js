/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/12/5 17:50
 */
import HZRecorder from './HZRecorder'

/**
 * 创建音频
 * @param audioParams
 * @returns {Promise<void>}
 */
function createAudio (audioParams = {}) {
  return new Promise((resolve, reject) => {
    audioParams.flag = false
    audioParams.message = '浏览器没有录音权限'
    audioParams.recorder = {}
    try {
      // 检查是否能够调用麦克风
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      if (!navigator.getUserMedia) {
        audioParams.message = '浏览器没有录音权限!'
        return resolve(audioParams)
      }
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
      window.URL = window.URL || window.webkitURL
    } catch (e) {
      audioParams.message = '此浏览器不支持web音频!'
    }

    navigator.getUserMedia({ audio: true }, stream => {
      audioParams.flag = true
      audioParams.message = '初始化完成'
      audioParams.recorder = new HZRecorder(stream)
      resolve(audioParams)
    }, e => {
      audioParams.message = `没有音频设备输入：${e}`
      resolve(audioParams)
    })
  })
}

export default createAudio