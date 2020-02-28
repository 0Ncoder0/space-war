import ObjectItem from './ObjectItem'
import Point from '../math/Point'
import Printer from '../lib/Printer'
import Bullet from './Bullet'
import configs from '../static/configs'
import FlagSwitcher from '../lib/FlagSwitcher'
import LockedCircle from './UI/LockedCircle'
// private
const Ship = function (config) {
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
    flameColor: 'red',
    bulletType: 'bullet_normal', //子弹类型
    openFire: false, //控制开火
    firePerSecond: 6, //开火频率 次/秒
    ammo: 699, //弹药数
    openFollowerPerspective: false,// 视角跟随
  }
)

// public
// 属性计算计时器 # 在父函数基础上新增开火计时器
Ship.prototype.auto = function () {
  ObjectItem.prototype.auto.call(this)
  // 开火计时器
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
Ship.prototype.move = function (distance, angle) {
  ObjectItem.prototype.move.call(this, distance, angle)

  if (this.openFollowerPerspective) {
    const center = {
      x: Printer.canvas.width / 2,
      y: Printer.canvas.height / 2,
    }
    const offset = {
      x: center.x - this.centerX,
      y: center.y - this.centerY
    }
    Printer.setOffset(offset)
  }

}

// 绘制 # 在父函数基础上增加尾焰绘制
FlagSwitcher.addFlag('ShowShipState')
Ship.prototype.draw = function () {
  ObjectItem.prototype.draw.call(this)
  const printer = new Printer()

  const flame = this.getFlame()
  printer.fill(flame, this.flameColor)
  // // 显示部分参数
  // if (FlagSwitcher.getFlag('ShowShipState')) {
  //   const speed = this.speed.toFixed(2)
  //   const angle = this.angle.toFixed(2)
  //   printer.write(`SPEED : ${speed}`, { x: printer.width - 120, y: 20 }, 'green')
  //   printer.write(`ANGLE : ${angle}`, { x: printer.width - 120, y: 55 }, 'green')
  // }
}
// 挂载控制器手动操作
Ship.prototype.manual = function (controller) {
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
      action.keypress.push(actions[action.name].keypress)
    }
  })
}
// 发射导弹
Ship.prototype.fire = function () {
  if (this.ammo <= 0) {
    return
  }
  const config = configs[this.bulletType || 'bullet_normal']
  const speedRate = 2
  const center = Point.getPoint(
    { x: this.centerX, y: this.centerY },
    Point.toRadian(-this.angle),
    (config.height + this.height) / 2 + 10
  )
  const bullet_config = {
    speed: this.maxSpeed * speedRate,
    maxSpeed: this.maxSpeed * speedRate,
    centerX: center.x,
    centerY: center.y,
    borderX: this.borderX,
    borderY: this.borderY,
    angle: this.angle,
    target: this.target
  }

  new Bullet(Object.assign({}, config, bullet_config)).auto()
  this.ammo--
}
Ship.prototype.aim = function () {
  ObjectItem.prototype.aim.call(this)
  if (this.target) {
    if (!this.lockedCircle) {
      this.lockedCircle = new LockedCircle(this.target)
      return
    }
    if (this.lockedCircle.target.id !== this.target.id) {
      this.lockedCircle.setDestroyed(true)
      this.lockedCircle = new LockedCircle(this.target)
    }

  }
}
// getter
// 操作
Ship.prototype.getActions = function () {
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
        ship.setTurnSpeed(ship.temp.turnAcceleration)
      },
      keyup() {
        ship.turnAcceleration = 0
        ship.turnSpeed = 0
      }
    },
    right: {
      keydown() {
        ship.turnAcceleration = -ship.temp.turnAcceleration
        ship.setTurnSpeed(-ship.temp.turnAcceleration)
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
    },
    aim: {
      keypress() {
        ship.openAim = !ship.openAim
      },
    }
  }
}
// 尾焰
Ship.prototype.getFlame = function (shape) {
  shape = shape || 'triangle'
  const height = (this.speed / this.maxSpeed) * this.height * 0.8
  const width = (this.speed / this.maxSpeed) * this.width * 0.8
  const angle = this.angle + 180
  const center = Point.getPoint(
    { x: this.centerX, y: this.centerY },
    Point.toRadian(-angle),
    (height + this.height) / 2
  )
  const points = Point[shape]({ height, width, angle: -angle, center })
  return points
}
// setter
Ship.prototype.setTurnSpeed = function (val) {
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
Ship.prototype.setBulletType = function (val) {
  this.bulletType = val
  this.firePerSecond = configs[val].firePerSecond
}
Ship.prototype.firePerSecond = function (val) {
  this.firePerSecond = val
}
export default Ship
