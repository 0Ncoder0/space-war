// 绘制工具
const Printer = function(canvas) {
  if (canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  } else {
    this.canvas = Printer.prototype.canvas || document.getElementById('canvas')
    this.ctx = Printer.prototype.ctx || this.canvas.getContext('2d')
  }
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
Printer.prototype.canvas = Printer.canvas = null
Printer.prototype.ctx = Printer.ctx = null
Printer.prototype.setGlobalCanvas = Printer.setGlobalCanvas = function(canvas) {
  Printer.prototype.canvas = canvas
  Printer.prototype.ctx = canvas.getContext('2d')
}
// public
// 填充
Printer.prototype.fill = function(points, color) {
  this.ctx.beginPath()
  for (let i in points) {
    if (i === 0) {
      this.ctx.moveTo(points[i].x, points[i].y)
    } else {
      this.ctx.lineTo(points[i].x, points[i].y)
    }
  }
  this.ctx.fillStyle = color || 'red'
  this.ctx.fill()
}
// 写字
Printer.prototype.write = function(text, start, color, font) {
  this.ctx.font = '16px arial'
  this.ctx.fillStyle = color
  this.ctx.fillText(text, start.x, start.y)
}
// 渲染器
Printer.prototype.render = function(frame, interval) {
  let time = {
    before: new Date().getTime(),
    after: new Date().getTime()
  }
  setInterval(() => {
    time.after = new Date().getTime()
    this.fps = 1000 / (time.after - time.before)

    this.fill(this.background, this.backgroundColor)
    frame()

    time.before = new Date().getTime()
  }, interval || 1000 / 60)
}

export default Printer
