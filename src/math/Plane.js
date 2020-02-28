import Line from './Line'

const Plane = function (points) {
  this.points = points
  this.lines = []
  this.lines.push(new Line(points[0], points[points.length - 1]))
  for (let i = 1; i < points.length; i++) {
    this.lines.push(new Line(points[i], points[i - 1]))
  }
}
// static
// 平面是否相交
Plane.isCrossed = function (planeA, planeB) {
  for (let i in planeA.points) {
    const isInnerPoint = planeB.isInnerPoint(planeA.points[i])
    if (isInnerPoint) {
      return true
    }
  }
  for (let i in planeB.points) {
    const isInnerPoint = planeA.isInnerPoint(planeB.points[i])
    if (isInnerPoint) {
      return true
    }
  }
  for (let i in planeA.lines) {
    for (let k in planeB.lines) {
      const isCrossed = Line.isCrossed(planeB.lines[k], planeA.lines[i])
      if (isCrossed) {
        return true
      }
    }
  }
  return false
}
// public
// 点是否在平面内
Plane.prototype.isInnerPoint = function ({ x, y }) {
  const YLine = this.getYLine(x)
  const XLine = this.getXLine(y)
  if (YLine === null || XLine === null) {
    return false
  }
  const innerX = YLine.getX(y)
  const innerY = XLine.getY(x)
  if (innerX === null || Number.isNaN(innerX) || innerY === null || Number.isNaN(innerY)) {
    return false
  }

  return true
}
// getter
// 不考虑凹型图
// 获取过 y 与 X 轴平行的线
Plane.prototype.getXLine = function (y) {
  let maxX = null
  let minX = null
  this.lines.forEach(line => {
    const x = line.getX(y)
    if (x === null) {
      return
    }
    if (maxX === null || x > maxX) {
      maxX = x
    }
    if (minX === null || x < minX) {
      minX = x
    }
  })
  if (maxX !== null && minX !== null) {
    return new Line({ x: maxX, y }, { x: minX, y })
  }
  return null
}
// 获取过 x 与 Y 轴平行的线
Plane.prototype.getYLine = function (x) {
  let maxY = null
  let minY = null
  this.lines.forEach(line => {
    const y = line.getY(x)

    if (y === null) {
      return
    }
    if (maxY === null || y > maxY) {
      maxY = y
    }
    if (minY === null || y < minY) {
      minY = y
    }
  })
  if (maxY !== null && minY !== null) {
    return new Line({ y: maxY, x }, { y: minY, x })
  }
  return null
}

// 考虑凹型图
// 还没写

export default Plane
