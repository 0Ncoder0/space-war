import Printer from '../lib/Printer'
import Point from '../math/Point'
import GlobalItem from '../lib/GlobalItem'
import Plane from '../math/Plane'
const ObjectItem = function (config) {
  Object.assign(this, this.config_default, config)
  this.id = Math.random()
    .toString()
    .split('.')[1]
  // 在全局保存这个对象的指向
  if (this.borderX === 0) {
    const printer = new Printer()
    this.setBorder({ x: printer.width, y: printer.height })
  }
  GlobalItem.addItem(this)
}
// static
// 默认配置参数
ObjectItem.prototype.config_default = ObjectItem.config_default = {
  // 标识相关
  name: 'objectItem',
  id: null,
  //图形相关
  shape: 'rectangle', // 主体形状 Point 里面的方法名
  color: '#FFF', // 主体颜色
  centerX: 0, // 中心X坐标
  centerY: 0, // 中心Y坐标
  borderX: 0, // 最大X坐标值
  borderY: 0, // 最大Y坐标值
  height: 0, // 主体高度
  width: 0, // 主体宽度
  radius: 0, //主体为圆形时的半径
  angle: 0, // 主体角度 PS:Y轴方向为270度,X轴方向为0度

  //血量
  maxHealth: 0, //最大生命值
  health: 0, //生命值 //在撞击时也是对敌方的伤害值
  armor: 0, //护甲 # 受到的伤害 = 取大于零的(伤害 - 护甲)
  openCollisionDetection: true, //是否开启碰撞检测关闭后不会被检测到
  openDamageDetection: true, //开关伤害检测,关闭则不掉血
  // 移动速度
  acceleration: 0, //加速度 像素/秒^2
  speed: 0, // 像素/秒
  maxSpeed: 0, // 像素/秒
  maxBackwardSpeed: 0, //最大的倒车速度
  // 转向速度
  turnAcceleration: 0, //转向加速度 角度/秒^2
  turnSpeed: 0, // 转向速度 角度/秒
  maxTurnSpeed: 0, // 角度/秒

  interval: 1000 / 100, //自动模式下的数据刷新间隔
  destroyed: false, // 是否已经销毁,销毁后删除全局指向,停止相关计时器

  openAim: false,//开关瞄准功能
  aimAble: true,//能否被瞄准
  openTrack: false,//开关跟踪模式
  target: null,//瞄准的目标
}
// public
// 自动处理数据
ObjectItem.prototype.auto = function (perSecond) {
  perSecond = perSecond || 200
  // 移动计时器
  const timer = setInterval(() => {
    if (this.destroyed) {
      clearInterval(timer)
      return
    }
    // 移动
    this.setSpeed(this.speed + this.acceleration / perSecond)
    this.setTurnSpeed(this.turnSpeed + this.turnAcceleration / perSecond)
    const speed = this.speed / perSecond
    const turnSpeed = this.turnSpeed / perSecond
    this.move(speed, turnSpeed)
    // 碰撞
    if (this.openCollisionDetection) this.collisionDetection()
    // 瞄准
    this.openAim && this.aim()
    // 跟随
    if (this.target === null || this.target.destroyed) {
      this.openTrack && this.setTurnSpeed(0)
      this.target = null
    } else {
      this.openTrack && this.track()
    }


  }, 1000 / perSecond)
}
// 碰撞检测
ObjectItem.prototype.collisionDetection = function () {
  if (this.openCollisionDetection === false) {
    return
  }
  const points = this.getBody()
  const plane = new Plane(points)
  GlobalItem.getItems().forEach(item => {
    if (item.openCollisionDetection === false || item.id === this.id) {
      return
    }
    const isCrossed = Plane.isCrossed(plane, new Plane(item.getBody()))
    if (isCrossed) {
      console.info('检测到碰撞 id 为', this.id, item.id)
      //顺序不能乱
      const _item = Object.assign({}, item)
      item.onCollision(Object.assign({}, this))
      this.onCollision(Object.assign({}, _item))
    }
  })
}
//撞击时触发
ObjectItem.prototype.onCollision = function (target) {
  if (this.openCollisionDetection === false) {
    return
  }
  this.onHit(target.health)
}
// 受到攻击时触发
ObjectItem.prototype.onHit = function (damage) {
  if ((this.openDamageDetection = false)) {
    return
  }
  damage -= this.armor
  this.health -= damage > 0 ? damage : 0
  if (this.health <= 0) {
    this.setDestroyed(true)
  }
}
// 移动
ObjectItem.prototype.move = function (distance, angle) {
  distance = distance || this.speed
  this.setAngle(this.angle + angle)
  this.setCenter(
    Point.getPoint({ x: this.centerX, y: this.centerY }, Point.toRadian(-this.angle), distance)
  )
}
// 绘制
ObjectItem.prototype.draw = function () {
  new Printer().fill(this.getBody(), this.color)
}
// 获取图形顶点坐标组
ObjectItem.prototype.getBody = function () {
  return Point[this.shape]({
    center: { x: this.centerX, y: this.centerY },
    height: this.height,
    width: this.width,
    radius: this.radius,
    angle: -this.angle
  })
}
// AI
// 跟随目标 # 修改ObjectItem的加速度和转向速度 # prediction 是否开启跟随预判 # 用于跟踪导弹和敌人AI
ObjectItem.prototype.track = function () {
  this.acceleration = this.acceleration
  let angle = - Point.getAngle({
    x: this.centerX, y: this.centerY
  }, {
    x: this.target.centerX, y: this.target.centerY
  })
  let daAngle = angle - this.angle
  daAngle = daAngle < 0 ? 360 + daAngle : daAngle
  if (daAngle <= 180) {
    this.setTurnSpeed(this.turnAcceleration)
  } else {
    this.setTurnSpeed(-this.turnAcceleration)
  }
}
// 瞄准本体前方一定角度和范围内的最近目标 # 返回目标指向 # 用于辅助瞄准和设置跟踪导弹目标
ObjectItem.prototype.aim = function () {
  const height = 1000
  const width = 600

  const center = Point.getPoint(
    { x: this.centerX, y: this.centerY },
    Point.toRadian(-this.angle),
    (height + this.height) / 2 + 2
  )
  const points = Point.triangle({
    height: height,
    width: width,
    center: center,
    angle: -(this.angle + 180)
  })
  //   扫描面
  const range = new Plane(points)

  let closestDistance = null
  let findTarget = false
  //   范围内最近的目标
  GlobalItem.getItems().forEach(item => {
    if (!item.aimAble || item.id === this.id) {
      return
    }
    const center = {
      x: item.centerX,
      y: item.centerY
    }
    if (range.isInnerPoint(center)) {
      const distance = Point.getDistance(center, { x: this.centerX, y: this.centerY })
      if (closestDistance === null || distance < closestDistance) {
        closestDistance = distance
        findTarget = true
        this.target = item
      }
    }
  })
  findTarget || (this.target = null)
}
// setter
ObjectItem.prototype.setCenter = function (val) {
  this.setY(val.y)
  this.setX(val.x)
}
ObjectItem.prototype.setBorder = function (val) {
  this.borderX = val.x
  this.borderY = val.y
}
ObjectItem.prototype.setX = function (val) {
  this.centerX = val
  if (this.centerX > this.borderX || this.centerX < 0) {
    this.setDestroyed(true)
  }
}
ObjectItem.prototype.setY = function (val) {
  this.centerY = val
  if (this.centerY > this.borderY || this.centerY < 0) {
    this.setDestroyed(true)
  }
}
ObjectItem.prototype.setAngle = function (val) {
  this.angle = val
  this.angle = (val > 0 ? 0 : 360) + (val % 360)
}
ObjectItem.prototype.setSpeed = function (val) {
  if (val > this.maxSpeed) {
    this.speed = this.maxSpeed
  } else if (val < this.maxBackwardSpeed) {
    this.speed = this.maxBackwardSpeed
  } else {
    this.speed = val
  }
}
ObjectItem.prototype.setTurnSpeed = function (val) {
  if (val > this.maxTurnSpeed) {
    this.turnSpeed = this.maxTurnSpeed
  } else if (val < -this.maxTurnSpeed) {
    this.turnSpeed = -this.maxTurnSpeed
  } else {
    this.turnSpeed = val
  }
}
ObjectItem.prototype.setDestroyed = function (val) {
  this.destroyed = val
  if (this.destroyed) {
    GlobalItem.removeItem(this)
  } else {
    GlobalItem.addItem(this)
  }
}

export default ObjectItem
