/**
 *Created by limbo <yykaue@qq.com> on 2024/1/15.
 */

// 比例11/6 -25deg
const createWatermark = ({
  width = 300,
  height = 160,
  originX = 10,
  originY = 160,
  deg = -25,
  font = '20px \\5FAE\\8F6F\\96C5\\9ED1',
  color = 'rgba(62, 61, 50, 0.07)',
  globalAlpha = 1,
  messages = []
}) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.translate(originX, originY)
  ctx.fillStyle = color
  ctx.globalAlpha = globalAlpha
  ctx.font = font
  ctx.rotate(deg * Math.PI / 180)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'
  messages.forEach(item => {
    ctx.fillText(item.value || '', item.x || 0, item.y || 0)
  })
  const url = canvas.toDataURL()
  // 清除画布，释放内存
  ctx.clearRect(0, 0, width, height)
  return url
}

const createDom = ({ style = {}, url }) => {
  const dom = document.createElement('div')
  dom.style.backgroundImage = `url(${url})`
  dom.style.backgroundRepeat = 'repeat'
  dom.style.pointerEvents = 'none'
  dom.style.position = 'fixed'
  dom.style.top = '0'
  dom.style.right = '0'
  dom.style.bottom = '0'
  dom.style.left = '0'

  for (const key in style) {
    dom.style[key] = style[key]
  }
  return dom
}

const createMutationObserver = (dom) => {
  const targetNodeBody = document.body
  let targetNode = dom.cloneNode(true)
  document.body.appendChild(targetNode)

  // 当前DOM
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true }
  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      const targetDom = mutation.target
      const parentNode = targetDom.parentNode
      parentNode.removeChild(targetDom)

      targetNode = dom.cloneNode(true)
      parentNode.appendChild(targetNode)

      observer.observe(targetNode, config)
    }
  })
  observer.observe(targetNode, config)

  // body DOM
  const observerBody = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      mutation.removedNodes.forEach(function (item) {
        if (item === targetNode) {
          targetNode = dom.cloneNode(true)
          targetNodeBody.appendChild(targetNode)

          const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
              const targetDom = mutation.target
              const parentNode = targetDom.parentNode
              parentNode.removeChild(targetDom)

              targetNode = dom.cloneNode(true)
              parentNode.appendChild(targetNode)

              observer.observe(targetNode, config)
            }
          })

          observer.observe(targetNode, config)
        }
      })
    }
  })
  observerBody.observe(targetNodeBody, config)
}

const mergeData = (mainData, infoData, color) => {
  let bit, offset // offset的作用是找到alpha通道值
  switch (color) {
    case 'R':
      bit = 0
      offset = 3
      break
    case 'G':
      bit = 1
      offset = 2
      break
    case 'B':
      bit = 2
      offset = 1
      break
  }
  for (var i = 0; i < mainData.length; i++) {
    if (i % 4 === bit) {
    // 只处理目标通道
      if (infoData[i + offset] === 0 && (mainData[i] % 2 === 1)) {
      // 没有信息的像素，该通道最低位置0，但不要越界
        if (mainData[i] === 255) {
          mainData[i]--
        } else {
          mainData[i]++
        }
      } else if (infoData[i + offset] !== 0 && (mainData[i] % 2 === 0)) {
      // // 有信息的像素，该通道最低位置1
        mainData[i]++
      }
    }
  }
}

const separateData = (mainData) => {
  for (var i = 0; i < mainData.length; i++) {
    if (i % 4 === 0) {
      // R分量
      if (mainData[i] % 2 === 0) {
        mainData[i] = 0
      } else {
        mainData[i] = 255
      }
    } else if (i % 4 === 3) {
      // alpha通道不做处理
      continue
    } else {
      // 关闭其他分量，不关闭也不影响答案
      mainData[i] = 0
    }
  }
}

const onloadImage = (src) => new Promise((resolve, reject) => {
  const img = new Image()
  img.src = src
  img.onload = () => {
    resolve(img)
  }
  img.onerror = () => {
    reject(new Error('地址错误'))
  }
})

const repeatImage = async (src, width = 220, height = 120) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  const img = await onloadImage(src)
  const pattern = ctx.createPattern(img, 'repeat')
  ctx.fillStyle = pattern
  ctx.rect(0, 0, width, height)
  ctx.fill()
  // 清除Image，释放内存
  img.src = ''
  return {
    ctx,
    url: canvas.toDataURL()
  }
}

const encodeImg = async (mainSrc, infoSrc) => {
  const mainImg = await onloadImage(mainSrc)
  const { width, height } = mainImg
  const { ctx } = await repeatImage(infoSrc, width, height)

  const infoData = ctx.getImageData(0, 0, width, height).data

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const encodeCtx = canvas.getContext('2d')
  encodeCtx.drawImage(mainImg, 0, 0)
  const mainOriginal = encodeCtx.getImageData(0, 0, width, height)
  const mainData = mainOriginal.data
  mergeData(mainData, infoData, 'R')
  encodeCtx.putImageData(mainOriginal, 0, 0)

  const url = canvas.toDataURL()
  // 清除Image，释放内存
  mainImg.src = ''
  // 清除画布，释放内存
  ctx.clearRect(0, 0, width, height)
  encodeCtx.clearRect(0, 0, width, height)

  return url
}

const decodeImg = async src => {
  const mainImg = await onloadImage(src)
  const { width, height } = mainImg
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const decodeCtx = canvas.getContext('2d')
  decodeCtx.drawImage(mainImg, 0, 0)
  const mainOriginal = decodeCtx.getImageData(0, 0, width, height)
  const mainData = mainOriginal.data
  separateData(mainData)
  decodeCtx.putImageData(mainOriginal, 0, 0)

  const url = canvas.toDataURL()
  // 清除Image，释放内存
  mainImg.src = ''
  // 清除画布，释放内存
  decodeCtx.clearRect(0, 0, width, height)

  return url
}

const mergeImg = async (mainSrc, infoSrc, repeat = true) => {
  const mainImg = await onloadImage(mainSrc)
  const { width, height } = mainImg
  let infoImg
  let repeatCtx
  if (repeat) {
    const { ctx, url } = await repeatImage(infoSrc, width, height)
    repeatCtx = ctx
    infoImg = await onloadImage(url)
  } else {
    infoImg = await onloadImage(infoSrc)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const mergeCtx = canvas.getContext('2d')
  mergeCtx.drawImage(mainImg, 0, 0)
  mergeCtx.drawImage(infoImg, 0, 0)

  const url = canvas.toDataURL()
  // 清除Image，释放内存
  mainImg.src = ''
  infoImg.src = ''
  // 清除画布，释放内存
  if (repeatCtx) {
    repeatCtx.clearRect(0, 0, width, height)
  }
  mergeCtx.clearRect(0, 0, width, height)

  return url
}

export { createWatermark }
export { createDom }
export { createMutationObserver }
export { onloadImage }
export { repeatImage }
export { encodeImg }
export { decodeImg }
export { mergeImg }
