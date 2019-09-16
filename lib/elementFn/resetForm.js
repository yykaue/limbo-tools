/**
 *Created by limbo <yangyuke@hetao101.com> on 2019/9/16.
 */

/**
 * form表单多级校验重置
 * @param vue
 * @param refsArr refsForm:注册表单,refs1:注册的顶级组件,refs2:refs1下的子组件, private:私有的注册对象(与其他互斥) 必传项
 */
function resetForm (vue, refsArr = [{ refsForm: 'form', refs1: 'refs1', refs2: 'refs2', private: 'private' }]) {
  refsArr.forEach(item => {
    if (item.private) {
      item.private.resetFields()
    } else {
      if (item.refs2) {
        vue.$refs[item.refs1].$refs[item.refs2].$refs[item.refsForm].resetFields()
      } else if (item.refs1) {
        vue.$refs[item.refs1].$refs[item.refsForm].resetFields()
      } else if (item.refsForm) {
        vue.$refs[item.refsForm].resetFields()
      }
    }
  })
}

export default resetForm
