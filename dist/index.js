window.Control = {
  'up': {
    key: ['w', 'W', 'up'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'down': {
    key: ['s', 'S', 'down'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'left': {
    key: ['a', 'A', 'left'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'right': {
    key: ['d', 'D', 'right'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'fire': {
    key: ['f', 'F', ' '],
    keydown:[],
    keypress:[],
    keyup:[],
  },
}
const actions=['keydown','keyup','keypress']
actions.forEach(action=>{
  window.addEventListener(action, (e) => {
    for (let i in window.Control) {
      if (window.Control[i].key.indexOf(e.key) !== -1) {
        for(let k in window.Control[i][action]){
          window.Control[i][action][k]()
        }
      }
    }
  })
})
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


//#region  飞船对象

window.Ship = function (config, tailFlame) {
  tailFlame = tailFlame || {}
  config = config || {}
  this.config = {
    shape: 'triangle',
    color: '#FFF',
    center: { x: 100, y: 100 },
    height: 20,
    width: 10,
    angle: 90,
    acceleration: 0.1,
    speed: 0,
    maxSpeed: 6,
    turnSpeed: 6,
    border: {
      x: 600, y: 600
    }
  }

  //#region 配置
  let _config = this.config
  Object.defineProperty(this.config, 'speed', {
    set(speed) {
      if (speed < 0) {
        _config._speed = 0
      } else if (speed > _config.maxSpeed) {
        _config._speed = _config.maxSpeed
      } else {
        _config._speed = speed
      }
    },
    get() {
      return _config._speed || 0
    }
  })
  Object.defineProperty(this.config, 'angle', {
    set(angle) {
      if (_config._speed === 0) {
        return
      }
      _config._angle = angle % 360
      if (angle < 0) {
        _config._angle = 360 + _config._angle
      }
    },
    get() {
      return _config._angle || 0
    }
  })
  Object.defineProperty(this.config, 'center', {
    set(center) {
      if (_config._center === undefined) {
        _config._center = { x: 0, y: 0 }
        Object.defineProperty(_config._center, 'x', {
          set(x) {
            if (x > _config.border.x) {
              _config._center._x = _config.border.x
            } else if (x < 0) {
              _config._center._x = 0
            } else {
              _config._center._x = x
            }
          },
          get() {
            return _config._center._x
          }
        })
        Object.defineProperty(_config._center, 'y', {
          set(y) {
            if (y > _config.border.y) {
              _config._center._y = _config.border.y
            } else if (y < 0) {
              _config._center._y = 0
            } else {
              _config._center._y = y
            }
          },
          get() {
            return _config._center._y
          }
        })
      }
      Object.assign(_config._center, center)
    },
    get() {
      return _config._center
    }
  })
  Object.assign(this.config, { angle: 90, speed: 0 }, config)
  //#endregion 配置

  // 尾焰
  this.tailFlame = {
    shape: 'triangle',
    color: tailFlame.red || 'red',
    center: { x: 0, y: 0 },// 相对于飞船的尾部
    height: this.config.height * 0.6 * 0,
    width: this.config.width * 0.8 * 0,
    angle: this.config.angle + 180,
  }
  // 从飞船发射的子弹
  this.bullets = []
  setInterval(() => {
    this.bullets = this.bullets.filter(e => !e.config.destroyed)
  }, 1000 / 60)
  let timers = {}
  Acction = function (key, action, tnterval) {
    this.keydown = () => {
      if (timers[key]) {
        return
      }
      timers[key] = setInterval(action, tnterval || 1000 / 60)
    }
    this.keyup = () => {
      clearInterval(timers[key])
      timers[key] = null
    }
  }
  // 操作
  this.actions = {
    up: new Acction('up', () => {
      _config.speed += _config.acceleration

      this.tailFlame.width = this.config.width * 0.8 * (_config.speed / _config.maxSpeed)
      this.tailFlame.height = this.config.height * 0.6 * (_config.speed / _config.maxSpeed)
    }),
    down: new Acction('down', () => {
      _config.speed -= _config.acceleration
      this.tailFlame.width = this.config.width * 0.8 * (_config.speed / _config.maxSpeed)
      this.tailFlame.height = this.config.height * 0.6 * (_config.speed / _config.maxSpeed)
    }),
    left: new Acction('left', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle += da
      this.tailFlame.angle += da
    }),
    right: new Acction('right', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle -= da
      this.tailFlame.angle -= da
    }),
    fire: new Acction('fire', () => {
      this.bullets.push(new Bullet({
        color: '#FFF',
        center: this.fire(),
        angle: this.config.angle,
        speed: this.config.maxSpeed * 1.5,
        border: this.config.border
      }))

    }, 1000 / 5)

  }
}
//#region  外界录入

// 移动
window.Ship.prototype.move = function () { }
// 绘制
window.Ship.prototype.draw = function () { }
// 加载操作
window.Ship.prototype.load = function () { }
// 发射导弹 返回一个导弹坐标参数
window.Ship.prototype.fire = function () { }
//#endregion
//#endregion

//#region  子弹对象

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
//#region  外界录入

window.Bullet.prototype.move = function () { }

//#endregion
//#endregion
window.Point = {

  // 中心点，高，宽，角度 // angle 角度
  triangle({ center, height, width, angle }) {
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const baseCenter=util.getPoint(center,util.toRadian(angle+180),height/2)//底边中心点
    return [
      util.getPoint(center,util.toRadian(angle),height/2),//顶点
      util.getPoint(baseCenter,util.toRadian(angle+90),width/2),//右底边点
      util.getPoint(baseCenter,util.toRadian(angle-90),width/2),//左底边点
    ]
  },
  // 中心点，高，宽，角度 // angle 角度
  rectangle({ center,height,width,angle }){
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const topCenter= util.getPoint(center,util.toRadian(angle),height/2) //上边中心点
    const topLeft= util.getPoint(topCenter,util.toRadian(angle+90),width/2) // 左上角顶点
    const topRight=util.getPoint(topCenter,util.toRadian(angle-90),width/2) // 右上角顶点
    const bottomLeft= util.getPoint(topLeft,util.toRadian(angle+180),height) // 左下角顶点
    const bottomRight=util.getPoint(topRight,util.toRadian(angle+180),height) // 右下角顶点
    return [topLeft,topRight,bottomRight,bottomLeft]
  },
  // 中心点，半径
  circle({center,radius}){
    const util=this.util
    let points=[]
    for(let i=0;i<=360;i++){
      points.push(util.getPoint(center,util.toRadian(i),radius))
    }
    return points
  },
  util:{
    // 根据点坐标，角度和距离获取新点坐标 //angle 弧度
    getPoint(point, angle, length) {
      return {
        x: point.x+Math.cos(angle)*length,
        y: point.y+Math.sin(angle)*length
      }
    },
    // 转换角度到弧度
    toRadian(angle) {
      return angle / 360 * 2 * Math.PI
    },
    // 获取两点之间的距离
    getLengthOfPoints(a,b) {
      const dx = Math.abs(a.x - b.x)
      const dy = Math.abs(a.y - b.y)
      return Math.sqrt(dx * dx + dy * dy)
    }
  },
}
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
  for (let i in Control) {
    if (this.actions[i]) {
      Control[i].keydown.push(this.actions[i].keydown)
      Control[i].keyup.push(this.actions[i].keyup)
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

//#endregion
