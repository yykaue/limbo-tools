/**
 *Created by limbo <yykaue@qq.com> on 2025/3/26.
 */
/**
 * 创建多边形
 * @param width
 * @param height
 * @param originX
 * @param originY
 * @param drawType ['fill'] fill, stroke
 * @param fillStyle 'rgba(255, 114, 0, 0.3)'
 * @param strokeStyle '#FF7200'
 * @param closePath false
 * @param lineWidth 1
 * @param globalAlpha 1
 * @param points [ {x: 1, y: 1} ]
 * @returns url
 */
const createPolygon = ({
  width,
  height,
  originX,
  originY,
  drawType = ['fill'], // fill, stroke
  fillStyle = 'rgba(255, 114, 0, 0.3)',
  strokeStyle = '#FF7200',
  closePath = true,
  lineWidth = 1,
  globalAlpha = 1,
  points = []
}) => {
  const canvas = document.createElement('canvas')
  let maxPointX, maxPointY, minPointX, minPointY
  // Find the max and min points
  points.forEach(point => {
    const { x, y } = point
    if (x > maxPointX || maxPointX === undefined) {
      maxPointX = x
    }
    if (y > maxPointY || maxPointY === undefined) {
      maxPointY = y
    }
    if (x < minPointX || minPointX === undefined) {
      minPointX = x
    }
    if (y < minPointY || minPointY === undefined) {
      minPointY = y
    }
  })
  // Width
  if (!width && originX !== undefined) {
    width = maxPointX - originX
  } else if (!width && !originX) {
    width = maxPointX - minPointX
  }
  // Height
  if (!height && originY !== undefined) {
    height = maxPointY - originY
  } else if (!height && !originY) {
    height = maxPointY - minPointY
  }
  // Origin
  if (!originX) {
    originX = minPointX
  }
  if (!originY) {
    originY = minPointY
  }

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  ctx.globalAlpha = globalAlpha
  ctx.fillStyle = fillStyle
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  points.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x - originX, point.y - originY)
    } else {
      ctx.lineTo(point.x - originX, point.y - originY)
    }
  })

  closePath && ctx.closePath()
  drawType.includes('stroke') && ctx.stroke()
  drawType.includes('fill') && ctx.fill()

  const url = canvas.toDataURL()
  // 清除画布，释放内存
  ctx.clearRect(0, 0, width, height)
  return url
}

export default createPolygon
