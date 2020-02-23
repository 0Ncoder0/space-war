import Line from './Line'

const Plane = function(points) {
  this.points = points
  this.lines = []
  for (let i = 1; i < points.length; i++) {
    this.lines.push(new Line(points[i], points[i - 1]))
  }
  this.lines.push(new Line(points[points.length - 1], points[0]))
}
Plane.prototype.isCrossed = Plane.isCrossed = function(planeA, planeB) {
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
// 不考虑凹型图
Plane.prototype.getXLine = function(y) {
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
Plane.prototype.getYLine = function(x) {
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
Plane.prototype.isInnerPoint = function({ x, y }) {
  const YLine = this.getYLine(x)

  if (YLine === null) {
    return false
  }
  const innerX = YLine.getX(y)

  if (innerX === null) {
    return false
  }
  return true
}
// 考虑凹型图

const pointsA = []
const pointsB = []

const isCrossed = Plane.isCrossed(new Plane(pointsA), new Plane(pointsB))
console.log(isCrossed)

export default Plane
