import Printer from '../lib/Printer'
import Point from '../lib/Point'
import GlobalItem from '../lib/GlobalItem'
const ObjectItem = function(config) {
  Object.assign(this, this.config_default, config)
  this.id = Math.random()
    .toString()
    .split('.')[1]
  // 在全局保存这个对象的指向
  GlobalItem.addItem(this)
}
//#region static
// 默认配置参数
ObjectItem.prototype.config_default = ObjectItem.config_default = {
  name: 'objectItem',
  id: null,
  shape: 'rectangle',

  color: '#FFF',
  centerX: 0,
  centerY: 0,
  borderX: 0,
  borderY: 0,
  height: 0,
  width: 0,
  angle: 0,
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
  destroyed: false
}
//#endregion static
//#region public
// 移动
ObjectItem.prototype.move = function(distance, angle) {
  distance = distance || this.speed
  this.setAngle(this.angle + angle)
  this.setCenter(
    Point.getPoint({ x: this.centerX, y: this.centerY }, Point.toRadian(-this.angle), distance)
  )
}
// 绘制
ObjectItem.prototype.draw = function() {
  new Printer().fill(this.getBody(), this.color)
}
// 自动处理数据
ObjectItem.prototype.auto = function() {
  const perSecond = 100
  // 移动计时器
  const timer = setInterval(() => {
    if (this.destroyed) {
      clearInterval(timer)
    }
    this.setSpeed(this.speed + this.acceleration / perSecond)
    this.setTurnSpeed(this.turnSpeed + this.turnAcceleration / perSecond)
    const speed = this.speed / perSecond
    const turnSpeed = this.turnSpeed / perSecond
    this.move(speed, turnSpeed)
  }, 1000 / perSecond)
}
//#endregion public
//#region getter
ObjectItem.prototype.getBody = function() {
  return Point[this.shape]({
    center: { x: this.centerX, y: this.centerY },
    height: this.height,
    width: this.width,
    radius: this.radius,
    angle: -this.angle
  })
}
//#endregion getter
//#region setter
ObjectItem.prototype.setCenter = function(val) {
  this.setY(val.y)
  this.setX(val.x)
}
ObjectItem.prototype.setX = function(val) {
  this.centerX = val
  if (this.centerX > this.borderX || this.centerX < 0) {
    this.setDestroyed(true)
  }
}
ObjectItem.prototype.setY = function(val) {
  this.centerY = val
  if (this.centerY > this.borderY || this.centerY < 0) {
    this.setDestroyed(true)
  }
}
ObjectItem.prototype.setAngle = function(val) {
  this.angle = val
  this.angle = (val > 0 ? 0 : 360) + (val % 360)
}
ObjectItem.prototype.setSpeed = function(val) {
  if (val > this.maxSpeed) {
    this.speed = this.maxSpeed
  } else if (val < this.maxBackwardSpeed) {
    this.speed = this.maxBackwardSpeed
  } else {
    this.speed = val
  }
}
ObjectItem.prototype.setTurnSpeed = function(val) {
  if (val > this.maxTurnSpeed) {
    this.turnSpeed = this.maxTurnSpeed
  } else if (val < -this.maxTurnSpeed) {
    this.turnSpeed = -this.maxTurnSpeed
  } else {
    this.turnSpeed = val
  }
}
ObjectItem.prototype.setDestroyed = function(val) {
  this.destroyed = val
  if (this.destroyed) {
    GlobalItem.removeItem(this)
  }
}

//#endregion setter

export default ObjectItem
