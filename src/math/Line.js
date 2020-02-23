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
  y1 !== null && y2 !== null && console.log('outer', y1, y2)
  if (y1 !== null && y2 !== null && y1 === y2) {
    console.log('inner', y1, y2)
    return true
  }

  x2 = y1 === null ? lineB.getX(y2) : lineA.getX(y1)

  if (x2 === null) {
    return false
  }
  console.log('outer', x1, x2)
  if (x2 === x1) {
    console.log('inner', x1, x2)
    return true
  }

  return false
}

Line.prototype.getX = function(y) {
  let x = (y - this.b) / this.a
  if (x > this.maxX || x < this.minX) {
    return null
  }
  return x
}

Line.prototype.getY = function(x) {
  let y = this.a * x + this.b
  if (y > this.maxY || y < this.minY) {
    return null
  }
  return y
}
console.log(1)

export default Line
