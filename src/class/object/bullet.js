

window.Bullet = function (config) {

  this.config = {
    shape: 'rectangle',
    color: '#FFF',
    center: { x: 100, y: 100 },
    height: 3,
    width: 3,
    angle: 90,
    acceleration: 0.1,
    speed: 0,
    border: {
      x: 600, y: 600
    },
    destroyed: false
  }
  Object.assign(this.config, config)
  const timer = setInterval(() => {
    if (this.config.center.x > this.config.border.x || this.config.center.x < 0) {
      this.config.destroyed = true
      clearInterval(timer)
    }
    if (this.config.center.y > this.config.border.y || this.config.center.y < 0) {
      this.config.destroyed = true
      clearInterval(timer)
    }
    this.move()

  }, 1000 / 60)
}
// 移动
window.Bullet.prototype.move = function () { }