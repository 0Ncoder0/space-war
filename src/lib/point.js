const Point = function() {}
//#region  static
// 中心点，高，宽，角度 // angle 角度
Point.prototype.triangle = Point.triangle = function({ center, height, width, angle }) {
  angle = angle === 0 ? angle : angle || 90
  const baseCenter = this.getPoint(center, this.toRadian(angle + 180), height / 2) //底边中心点
  return [
    this.getPoint(center, this.toRadian(angle), height / 2), //顶点
    this.getPoint(baseCenter, this.toRadian(angle + 90), width / 2), //右底边点
    this.getPoint(baseCenter, this.toRadian(angle - 90), width / 2) //左底边点
  ]
}
// 中心点，高，宽，角度 // angle 角度
Point.prototype.rectangle = Point.rectangle = function({ center, height, width, angle }) {
  angle = angle === 0 ? angle : angle || 90
  const topCenter = this.getPoint(center, this.toRadian(angle), height / 2) //上边中心点
  const topLeft = this.getPoint(topCenter, this.toRadian(angle + 90), width / 2) // 左上角顶点
  const topRight = this.getPoint(topCenter, this.toRadian(angle - 90), width / 2) // 右上角顶点
  const bottomLeft = this.getPoint(topLeft, this.toRadian(angle + 180), height) // 左下角顶点
  const bottomRight = this.getPoint(topRight, this.toRadian(angle + 180), height) // 右下角顶点
  return [topLeft, topRight, bottomRight, bottomLeft]
}
// 中心点，半径
Point.prototype.circle = Point.circle = function({ center, radius }) {
  let points = []
  for (let i = 0; i <= 360; i++) {
    points.push(this.getPoint(center, this.toRadian(i), radius))
  }
  return points
}
// 根据点坐标，角度和距离获取新点坐标 //angle 弧度
Point.prototype.getPoint = Point.getPoint = function(point, angle, length) {
  return {
    x: point.x + Math.cos(angle) * length,
    y: point.y + Math.sin(angle) * length
  }
}
// 转换角度到弧度
Point.prototype.toRadian = Point.toRadian = function(angle) {
  return (angle / 360) * 2 * Math.PI
}
// 获取两点之间的距离
Point.prototype.getLengthOfPoints = Point.getLengthOfPoints = function(a, b) {
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  return Math.sqrt(dx * dx + dy * dy)
}
//#endregion static
export default Point
