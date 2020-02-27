// 绘制工具
const Printer = function () {
  Printer.canvas = Printer.canvas || document.getElementById('canvas')
  this.canvas = Printer.canvas
  this.ctx = Printer.canvas.getContext('2d')
  // 画布高度
  this.height = this.canvas.height
  // 画布宽度
  this.width = this.canvas.width
  // 背景
  this.background = [
    { x: 0, y: 0 },
    { x: this.width, y: 0 },
    { x: this.width, y: this.height },
    { x: 0, y: this.height }
  ]
  // 背景颜色
  this.backgroundColor = '#000'
  // 帧数
  this.fps = 0
}
// static

// 偏移量
Printer.offset = { x: 0, y: 0 }
Printer.canvas = null

Printer.prototype.setGlobalCanvas = Printer.setGlobalCanvas = function (canvas) {
  Printer.canvas = canvas
  Printer.ctx = canvas.getContext('2d')
}
Printer.prototype.setOffset = Printer.setOffset = function ({ x, y }) {
  Printer.offset.x = x
  Printer.offset.y = y
}

// public
// 填充
Printer.prototype.fill = function (points, color) {
  const offsetX = Printer.offset.x || 0
  const offsetY = Printer.offset.y || 0
  this.ctx.beginPath()
  for (let i in points) {
    if (i === 0) {
      this.ctx.moveTo(points[i].x + offsetX, points[i].y + offsetY)
    } else {
      this.ctx.lineTo(points[i].x + offsetX, points[i].y + offsetY)
    }
  }

  this.ctx.fillStyle = color || 'red'
  this.ctx.fill()
}
// 连线
Printer.prototype.stroke = function (points, color, width) {
  this.ctx.beginPath()
  for (let i in points) {
    if (i === 0) {
      this.ctx.moveTo(points[i].x + offsetX, points[i].y + offsetY)
    } else {
      this.ctx.lineTo(points[i].x + offsetX, points[i].y + offsetY)
    }
  }
  this.ctx.lineTo(points[0].x, points[0].y)

  this.ctx.strokeStyle = color || 'red'
  this.ctx.stroke()
}
// 写字
Printer.prototype.write = function (text, start, color, font) {
  this.ctx.font = '16px arial'
  this.ctx.fillStyle = color
  this.ctx.fillText(text, start.x, start.y)
}
// 画背景
Printer.prototype.fillBackground = function () {
  const points = this.background
  this.ctx.beginPath()
  for (let i in points) {
    if (i === 0) {
      this.ctx.moveTo(points[i].x, points[i].y)
    } else {
      this.ctx.lineTo(points[i].x, points[i].y)
    }
  }

  this.ctx.fillStyle = this.backgroundColor
  this.ctx.fill()
}
// 渲染器
Printer.prototype.render = function (frame, interval) {
  let time = {
    before: new Date().getTime(),
    after: new Date().getTime()
  }
  setInterval(() => {
    time.after = new Date().getTime()
    this.fps = 1000 / (time.after - time.before)

    this.fillBackground()
    frame()

    time.before = new Date().getTime()
  }, interval || 1000 / 60)
}

export default Printer
