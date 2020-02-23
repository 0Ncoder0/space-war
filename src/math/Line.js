const Line = function(pointA, pointB) {
  pointA = { x: pointA.x, y: pointA.y }
  pointB = { x: pointB.x, y: pointB.y }
  if (pointB.x === pointA.x) {
    pointB.x += 0.001
  }
  if (pointB.y === pointA.y) {
    pointB.y += 0.001
  }
  this.points = [pointA, pointB]
  const x1 = pointA.x
  const y1 = pointA.y
  const x2 = pointB.x
  const y2 = pointB.y
  this.a = (y1 - y2) / (x1 - x2)
  this.b = y1 - this.a * x1
  this.maxX = x1 > x2 ? x1 : x2
  this.maxY = y1 > y2 ? y1 : y2
  this.minX = x1 < x2 ? x1 : x2
  this.minY = y1 < y2 ? y1 : y2
}

Line.prototype.formula = Line.formula = 'y=ax+b'

Line.prototype.isCrossed = Line.isCrossed = function(lineA, lineB) {
  let a1 = lineA.a
  let b1 = lineA.b
  let a2 = lineB.a
  let b2 = lineB.b
  let x1 = (b2 - b1) / (a1 - a2)
  let y1 = lineB.getY(x1)
  let y2 = lineA.getY(x1)
  let x2 = null
  if (y1 === null && y2 === null) {
    return false
  }
  if (y1 !== null && !Number.isNaN(y1) && y2 !== null && !Number.isNaN(y2)) {
    if (y1.toFixed(3) === y2.toFixed(3)) {
      return true
    }
  }

  x2 = y1 === null ? lineB.getX(y2) : lineA.getX(y1)

  if (x2 === null || Number.isNaN(x2)) {
    return false
  }
  if (x2.toFixed(3) === x1.toFixed(3)) {
    return true
  }

  return false
}

Line.prototype.getX = function(y) {
  if (y > this.maxY || y < this.minY) {
    return null
  }
  let x = (y - this.b) / this.a
  if (x > this.maxX || x < this.minX) {
    return null
  }
  return x
}

Line.prototype.getY = function(x) {
  if (x > this.maxX || x < this.minX) {
    return null
  }
  let y = this.a * x + this.b
  if (y > this.maxY || y < this.minY) {
    return null
  }
  return y
}

export default Line
