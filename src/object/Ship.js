import ObjectItem from './ObjectItem'
import Point from '../math/Point'
import Printer from '../lib/Printer'
import Bullet from './Bullet'
import configs from '../static/configs'
import FlagSwitcher from '../lib/FlagSwitcher'
import LockedCircle from './UI/LockedCircle'
import Flame from './UI/Flame'
import Fire from './action/Fire'
// private
const Ship = function (config) {
  ObjectItem.call(this, config)
  this.temp = {
    acceleration: this.acceleration,
    turnAcceleration: this.turnAcceleration
  }
  this.autoMethods.push(this.fire)

  new Flame(this)
}
Object.assign(Ship.prototype, ObjectItem.prototype, Fire.prototype)
// static
Ship.prototype.config_default = Ship.config_default = Object.assign(
  {},
  ObjectItem.prototype.config_default,
  {
    name: 'ship',
    shape: 'triangle',
    color: '#FFF',
    flameColor: 'red',
    openFollowerPerspective: false,// 视角跟随
  },
  Fire.prototype.config_default,
)

// public

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

export default Ship
