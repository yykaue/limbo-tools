/**
 *Created by limbo <yangyuke@hetao101.com> on 2020/7/10 17:55
 */

function randomName (len) {
  len = len || 23
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}

export default randomName
