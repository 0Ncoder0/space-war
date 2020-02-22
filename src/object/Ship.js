import ObjectItem from './ObjectItem'
import Point from '../lib/Point'
import Printer from '../lib/Printer'
import Bullet from './Bullet'
import configs from '../static/configs'
// private
const Ship = function(config) {
  ObjectItem.call(this, config)
  this.temp = {
    acceleration: this.acceleration,
    turnAcceleration: this.turnAcceleration
  }
}
Object.assign(Ship.prototype, ObjectItem.prototype)
// static
Ship.prototype.config_default = Ship.config_default = Object.assign(
  {},
  Ship.prototype.config_default,
  {
    name: 'ship',
    shape: 'triangle',
    color: '#FFF',
    openFire: false,
    firePerSecond: 5
  }
)

// public
const auto = ObjectItem.prototype.auto
Ship.prototype.auto = function() {
  auto.call(this)
  // 开火计时器
  console.log('开火计时器')
  const ship = this
  const timer = setInterval(() => {
    if (ship.destroyed === true) {
      clearInterval(timer)
    }
    if (ship.openFire) {
      ship.fire()
    }
  }, 1000 / this.firePerSecond)
}
// 绘制
const draw = ObjectItem.prototype.draw
Ship.prototype.draw = function() {
  draw.call(this)
  const flame = this.getFlame('red')
  new Printer().fill(flame.points, flame.color)
}
// 挂载控制器手动操作
Ship.prototype.manual = function(controller) {
  Object.assign(this, {
    acceleration: 0,
    turnAcceleration: 0,
    speed: 0,
    turnSpeed: 0,
    openFire: false
  })
  this.auto()
  const actions = this.getActions()
  controller.actions.forEach(action => {
    if (actions[action.name]) {
      action.keydown.push(actions[action.name].keydown)
      action.keyup.push(actions[action.name].keyup)
    }
  })
}
// 发射导弹
Ship.prototype.fire = function() {
  const speedRate = 1.5
  const center = Point.getPoint(
    { x: this.centerX, y: this.centerY },
    Point.toRadian(-this.angle),
    (configs.bullet_normal.height + this.height) / 2
  )
  const bullet_config = {
    speed: this.maxSpeed * speedRate,
    maxSpeed: this.maxSpeed * speedRate,
    centerX: center.x,
    centerY: center.y,
    borderX: this.borderX,
    borderY: this.borderY,
    angle: this.angle
  }
  new Bullet(Object.assign({}, configs.bullet_normal, bullet_config)).auto()
}
// getter
// 操作
Ship.prototype.getActions = function() {
  const ship = this
  return {
    up: {
      keydown() {
        ship.acceleration = ship.temp.acceleration
      },
      keyup() {
        ship.acceleration = 0
      }
    },
    down: {
      keydown() {
        ship.acceleration = -ship.temp.acceleration
      },
      keyup() {
        ship.acceleration = 0
      }
    },
    left: {
      keydown() {
        ship.turnAcceleration = ship.temp.turnAcceleration
        ship.turnSpeed = ship.temp.turnAcceleration
      },
      keyup() {
        ship.turnAcceleration = 0
        ship.turnSpeed = 0
      }
    },
    right: {
      keydown() {
        ship.turnAcceleration = -ship.temp.turnAcceleration
        ship.turnSpeed = -ship.temp.turnAcceleration
      },
      keyup() {
        ship.turnAcceleration = 0
        ship.turnSpeed = 0
      }
    },
    fire: {
      keydown() {
        ship.openFire = true
      },
      keyup() {
        ship.openFire = false
      }
    }
  }
}
// 尾焰
Ship.prototype.getFlame = function(color, shape) {
  shape = shape || 'triangle'
  color = color || 'red'
  const height = (this.speed / this.maxSpeed) * this.height * 0.8
  const width = (this.speed / this.maxSpeed) * this.width * 0.8
  const angle = this.angle + 180
  const center = Point.getPoint(
    { x: this.centerX, y: this.centerY },
    Point.toRadian(-angle),
    (height + this.height) / 2
  )
  const points = Point[shape]({ height, width, angle: -angle, center })
  return { points, color }
}
// setter
Ship.prototype.setTurnSpeed = function(val) {
  const rate = this.speed / this.maxSpeed
  const maxTurnSpeed = this.maxTurnSpeed * rate
  if (val > maxTurnSpeed) {
    this.turnSpeed = maxTurnSpeed
  } else if (val < -maxTurnSpeed) {
    this.turnSpeed = -maxTurnSpeed
  } else {
    this.turnSpeed = val
  }
}
export default Ship
