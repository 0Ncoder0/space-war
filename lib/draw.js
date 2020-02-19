window.Draw = function (ctx) {
  this.ctx = ctx
  this.fill = (points, color) => {
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
  this.write = (text, start, color, font) => {
    ctx.font = "16px arial";
    ctx.fillStyle = color
    ctx.fillText(text, start.x, start.y);
  }
}

