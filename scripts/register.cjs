const { registerHooks } = require('node:module')
const { existsSync } = require('node:fs')
const { pathToFileURL } = require('node:url')
const path = require('node:path')

// 仅供开发验证：让 Node 加载库现有的 ESM 和省略扩展名的导入。
// 不改变发布入口，也不改写第三方依赖的模块格式。
const roots = ['lib', 'src'].map(dir => pathToFileURL(path.join(__dirname, '..', dir) + path.sep).href)
const isSource = url => roots.some(root => url.startsWith(root))

registerHooks({
  resolve (specifier, context, nextResolve) {
    if (specifier.startsWith('.') && context.parentURL && isSource(context.parentURL)) {
      const url = new URL(specifier, context.parentURL)
      if (!path.extname(url.pathname)) {
        const file = new URL(url.href + '.js')
        specifier = existsSync(file) ? file.href : new URL(url.href + '/index.js').href
      }
    }
    const result = nextResolve(specifier, context)
    return isSource(result.url) ? { ...result, format: 'module' } : result
  }
})
