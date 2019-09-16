/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/9/16.
 */
import { Message } from 'element-ui'

/**
 * form表单多级校验
 * @param vue
 * @param refsArr refsForm:注册表单,refs1:注册的顶级组件,refs2:refs1下的子组件, private:私有的注册对象(与其他互斥) 必传项
 * @param cb 回调函数
 * @returns {boolean}
 */
function ruleForm (vue, refsArr = [{ refsForm: 'form', refs1: 'refs1', refs2: 'refs2', private: 'private' }], cb) {
  let flag = true
  let flagNum = 1
  if (!refsArr || refsArr.length === 0) {
    return flag
  }

  refsArr.forEach(item => {
    if (item.private) {
      item.private.validate(flagForm => {
        if (!flagForm && flag) {
          flag = flagForm
        }
        cb && callback(flag)
      })
    } else {
      if (item.refs2) {
        vue.$refs[item.refs1].$refs[item.refs2].$refs[item.refsForm].validate((flagForm) => {
          if (!flagForm && flag) {
            flag = flagForm
          }
          cb && callback(flag)
        })
      } else if (item.refs1) {
        vue.$refs[item.refs1].$refs[item.refsForm].validate((flagForm) => {
          if (!flagForm && flag) {
            flag = flagForm
          }
          cb && callback(flag)
        })
      } else if (item.refsForm) {
        vue.$refs[item.refsForm].validate((flagForm) => {
          if (!flagForm && flag) {
            flag = flagForm
          }
          cb && callback(flag)
        })
      }
    }
  })

  function callback (flag) {
    flagNum++
    if (flagNum > refsArr.length) {
      if (flag) {
        cb()
      } else {
        Message({
          message: '请检查页面校验项',
          type: 'error',
          duration: 3000
        })
      }
    }
  }

  return flag
}

export default ruleForm
