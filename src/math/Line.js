const Line = function(pointA, pointB) {
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
  if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
  }
  // 平行 Y 轴
  if (pointA.x - pointB.x === 0) {
    this.getX = function(y) {
      if (y <= this.maxY && y >= this.minY) {
        return this.maxX
      }
      return null
    }
    this.getY = function(x) {
      return null
    }
    this.a = this.b = null
  }
  // 平行 X 轴
  if (pointA.y - pointB.y === 0) {
    this.getY = function(x) {
      if (x <= this.maxX && x >= this.minX) {
        return this.maxY
      }
      return null
    }
    this.getX = function(y) {
      return null
    }
    this.a = this.b = null
  }
}

Line.prototype.formula = Line.formula = 'y=ax+b'

Line.prototype.isCrossed = Line.isCrossed = function(lineA, lineB) {
  let a1 = lineA.a
  let b1 = lineA.b
  let a2 = lineB.a
  let b2 = lineB.b
  let x = null
  let y = null

  x = (b2 - b1) / (a1 - a2)
  y = lineB.getY(x)
  console.log(y, lineA.getY(x))
  if (y !== null && y === lineA.getY(x)) {
    return true
  }
  y = (-b1 * a2 + b2 * a1) / (a1 - a2)
  x = lineB.getX(y)
  console.log(x, lineA.getX(y))
  if (x !== null && x === lineA.getX(y)) {
    return true
  }
  return false
}

Line.prototype.getX = function(y) {
  const x = (y - this.b) / this.a
  if (x > this.maxX || x < this.minX) {
    return null
  }
  return x
}

Line.prototype.getY = function(x) {
  const y = this.a * x + this.b
  if (y > this.maxY || y < this.minY) {
    return null
  }
  return y
}

const l1 = new Line({ x: 0, y: 397 }, { x: 891, y: 397 })
const l2 = new Line({ x: 444, y: 797 }, { x: 444, y: 0 })
console.log(Line.isCrossed(l1, l2))

console.log(l1.getY(444), l2.getY(444))
console.log(l1.getY(444), l2.getY(444))

export default Line
