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
  height: 0, // 主体高度
  width: 0, // 主体宽度
  radius: 0, //主体为圆形时的半径
  angle: 0, // 主体角度 PS:Y轴方向为270度,X轴方向为0度
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

  // 其他
  methods: [],//在auto中会自动遍历并调用此数组中的方法 # 频率如上

}
// public
// 自动处理数据
ObjectItem.prototype.auto = function () {
  const perSecond = 1000 / this.interval
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

    for (let method of this.methods) {
      method()
    }
  }, this.interval)
}
// 移动
ObjectItem.prototype.move = function (distance, angle) {
  distance = distance || this.speed
  this.setAngle(this.angle + angle)
  this.setCenter(
    Point.getPoint({ x: this.centerX, y: this.centerY }, Point.toRadian(-this.angle), distance)
  )
}
// 绘制 # 全局渲染器自动调用
ObjectItem.prototype.draw = function () {
  new Printer().fill(this.getBody(), this.color)
}
// getter
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
}
ObjectItem.prototype.setY = function (val) {
  this.centerY = val
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
