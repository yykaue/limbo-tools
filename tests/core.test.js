const assert = require('node:assert/strict')
const { test } = require('node:test')
const { default: deepCopy } = require('../lib/baseFn/deepCopy.js')
const { default: unique } = require('../lib/baseFn/unique.js')
const { default: hasCodesInit } = require('../lib/baseFn/hasCodesInit.js')
const { default: byteConversion } = require('../lib/baseFn/byteConversion.js')
const { hexToRgb, rgbToHex, gradientColors } = require('../lib/baseFn/colorManage.js')

test('深拷贝隔离嵌套对象与数组', () => {
  const source = { list: [{ value: 1 }], empty: null }
  const copy = deepCopy(source)
  assert.deepEqual(copy, source)
  copy.list[0].value = 2
  assert.equal(source.list[0].value, 1)
})

test('数组去重保持首个对象和输入顺序，不丢失大整数形式的字符串 ID', () => {
  const first = { id: '9223372036854775806' }
  const second = { id: '9223372036854775807' }
  assert.deepEqual(unique('id', [first, second], [{ id: first.id }]), [first, second])
})

test('权限校验保留严格模式、空数组和 checkType 语义', () => {
  const permission = [{ checkType: 'button', codesList: ['read', 'write'] }]
  assert.equal(hasCodesInit(permission, ['read', 'delete'], 'button'), true)
  assert.equal(hasCodesInit(permission, ['read', 'delete'], 'button', true), false)
  assert.equal(hasCodesInit(permission, ['read'], 'route'), false)
  assert.equal(hasCodesInit(permission, [], 'button', true), true)
  assert.equal(hasCodesInit(permission, [], 'button'), false)
})

test('颜色和字节工具保持已有输出格式', () => {
  assert.deepEqual(hexToRgb('#abc'), [170, 187, 204])
  assert.equal(rgbToHex([170, 187, 204]), '#aabbcc')
  assert.deepEqual(gradientColors('#000', '#fff', 3), ['#000000', '#808080', '#ffffff'])
  assert.equal(byteConversion(0), '0B')
  assert.equal(byteConversion(1536), '1.5KB')
})
