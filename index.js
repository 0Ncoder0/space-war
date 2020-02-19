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
// 生产玩家对象
const player = new Player({
  center: { x: width / 2, y: height / 2 },
  border:{x:width,y:height }
})
// 玩家移动函数
player.move = () => {
  player.config.center = Point.util.getPoint(
    player.config.center,
    Point.util.toRadian(-player.config.angle),
    player.config.speed
  )
}
// 挂载操作事件
for (let i in Control) {
  if (player.actions[i]) {
    Control[i].keydown.push(player.actions[i].keydown)
    Control[i].keyup.push(player.actions[i].keyup)
  }
}
// 每帧执行一次清除和渲染
setInterval(() => {
  draw.fill(view, '#000')
  // crossLine(canvas, ctx)
  render()
}, 1000 / 60)
// 渲染方法
let angle = 0
function render() {
  player.move()
  let playerItem = Point[player.config.shape](player.config)
  draw.fill(playerItem, player.config.color)
  // 显示部分参数
  draw.write(`SPEED : ${player.config.speed.toFixed(2)}`,{x:width-120,y:20},'green')
  draw.write(`ANGLE : ${(player.config.angle%360).toFixed(2)}`,{x:width-120,y:55},'green')
}
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