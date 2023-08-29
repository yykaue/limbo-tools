/**
 *Created by limbo <yykaue@qq.com> on 2022/6/28.
 */

/**
 * 检测path是否以"/"开头，并替换
 * @param originalPath 传入path
 * @param contrastPath 对比path
 * @returns {*}
 */

function resolvePath (originalPath, contrastPath) {
  const reg = /^\//
  let redirect = `${originalPath}/${contrastPath}`
  if (reg.test(contrastPath)) {
    redirect = contrastPath
  }
  return redirect
}

export default resolvePath
