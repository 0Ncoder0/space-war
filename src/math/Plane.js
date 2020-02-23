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
      console.log('isInnerPoint')
      return true
    }
  }
  for (let i in planeB.points) {
    const isInnerPoint = planeA.isInnerPoint(planeB.points[i])
    if (isInnerPoint) {
      console.log('isInnerPoint')

      return true
    }
  }
  console.log(planeA.lines, planeB.lines)
  let count = 0
  for (let i in planeA.lines) {
    for (let k in planeB.lines) {
      const isCrossed = Line.isCrossed(planeB.lines[k], planeA.lines[i])
      if (isCrossed) {
        console.log('cross line')

        return true
      }
    }
  }
  console.log(count)
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

// const pointsA = [
//   { x: 0, y: 3 },
//   { x: 4, y: 3 },
//   { x: 4, y: 0 },
//   { x: 0, y: 0 }
// ]
// const pointsB = [
//   { x: 0, y: 0 },
//   { x: 0, y: 3 },
//   { x: 3, y: 0 }
// ]

// const ps = function(x, y) {
//   return { x, y }
// }

// const ps1 = [ps(-4, 0), ps(4, 0), ps(4, 1), ps(-4, 1)]
// const ps2 = [ps(0, -4), ps(0, 4), ps(1, 4), ps(1, -4)]

// console.log('ps1,ps2', Plane.isCrossed(new Plane(ps1), new Plane(ps2)))

// const isCrossed = Plane.isCrossed(new Plane(pointsA), new Plane(pointsB))
// console.log(isCrossed)
// window.Plane = Plane

// const ps3 = [
//   { x: 495.5, y: 101.5 },
//   { x: 495.5, y: 98.5 },
//   { x: 395.5, y: 98.5 },
//   { x: 395.5, y: 101.5 }
// ]
// const ps4 = [
//   { x: 456.91574564040565, y: 93.31449406481484 },
//   { x: 473.34072791063073, y: 106.96989436736156 },
//   { x: 460.3118389327363, y: 114.40279770331993 }
// ]

export default Plane
