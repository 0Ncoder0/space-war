const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const height = canvas.clientHeight//600
const width = canvas.clientWidth//600
const draw = new Draw(ctx)
// 背景
const view = Point.rectangle({
  center: { x: width / 2, y: height / 2 },
  height: height,
  width: width,
  angle: 90
})
//#region  公共函数


// 中心十字线
function crossLine(canvas, ctx) {
  ctx.beginPath()
  ctx.moveTo(canvas.clientWidth / 2, 0)
  ctx.lineTo(canvas.clientWidth / 2, canvas.clientHeight)
  ctx.closePath()
  ctx.strokeStyle = 'red'
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, canvas.clientHeight / 2)
  ctx.lineTo(canvas.clientWidth, canvas.clientHeight / 2)
  ctx.closePath()
  ctx.strokeStyle = 'red'
  ctx.stroke()
}
// 渲染
function render(frame) {
  // 每帧执行一次清除和渲染
  setInterval(() => {
    draw.fill(view, '#000')
    // crossLine(canvas, ctx)
    frame()
  }, 1000 / 60)
}

//#endregion

//#region 录入飞船对象公共方法

// 移动
Ship.prototype.move = function () {
  // 船身移动
  this.config.center = Point.util.getPoint(
    this.config.center,
    Point.util.toRadian(-this.config.angle),
    this.config.speed
  )
  // 尾焰移动
  this.tailFlame.center = Point.util.getPoint(
    this.config.center,
    Point.util.toRadian(-this.tailFlame.angle),
    (this.config.height + this.tailFlame.height) / 2
  )
}
// 绘制
Ship.prototype.draw = function () {
  let ship = Point.triangle(this.config)
  let tailFlame = Point.triangle(this.tailFlame)
  draw.fill(ship, this.config.color)
  draw.fill(tailFlame, this.tailFlame.color)
  for (let i in this.bullets) {
    let bullet = Point.rectangle(this.bullets[i].config)
    draw.fill(bullet, this.bullets[i].color)
  }
}
// 开火
Ship.prototype.fire = function () {
  return Point.util.getPoint(
    this.config.center,
    Point.util.toRadian(-this.config.angle),
    this.config.height / 2
  )
}
// 挂载操作事件
Ship.prototype.load = function () {
  for (let i in Control_Player_0) {
    if (this.actions[i]) {
      Control_Player_0[i].keydown.push(this.actions[i].keydown)
      Control_Player_0[i].keyup.push(this.actions[i].keyup)
    }
  }
}

//#endregion

//#region  录入子弹对象公共方法
Bullet.prototype.move = function () {
  this.config.center = Point.util.getPoint(
    this.config.center,
    Point.util.toRadian(-this.config.angle),
    this.config.speed
  )
}
//#endregion

//#region  执行

// 生产玩家对象
const player = new Ship({
  width: 10,
  height: 20,
  maxSpeed: 6,
  turnSpeed: 6,
  center: { x: width / 2, y: height / 2 },
  border: { x: width, y: height }
})
// 加载操作
player.load()
// 渲染帧
render(frame)

// 每一帧需要绘制的内容
function frame() {
  // 移动并绘制玩家
  player.move()
  player.draw()
  // 显示部分参数
  const speed = player.config.speed.toFixed(2)
  const angle = (player.config.angle % 360).toFixed(2)
  draw.write(`SPEED : ${speed}`, { x: width - 120, y: 20 }, 'green')
  draw.write(`ANGLE : ${angle}`, { x: width - 120, y: 55 }, 'green')
}
//#endregion