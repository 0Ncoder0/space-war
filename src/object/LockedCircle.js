// 在目标周围设置一个圈表示锁定 # 没有其他作用
import ObjectItem from './ObjectItem'
import Printer from '../lib/Printer'
const LockedCircle = function(target, config) {
  console.log(1)
  ObjectItem.call(this, config)
  this.target = target
  this.radius = target.height > target.width ? target.height : target.width
  this.centerX = target.centerX
  this.centerY = target.centerY

  console.log(this.getBody())
}

Object.assign(LockedCircle.prototype, ObjectItem.prototype)

LockedCircle.prototype.config_default = LockedCircle.config_default = Object.assign(
  {},
  ObjectItem.prototype.config_default,
  {
    name: 'lockedCircle',
    shape: 'circle',
    color: 'green',
    openDamageDetection: false,
    openCollisionDetection: false
  }
)

LockedCircle.prototype.stroke = function(perSecond) {
  perSecond = perSecond || 200
  const timer = setInterval(() => {
    if (this.destroyed) {
      clearInterval(timer)
      return
    }
    this.centerX = this.target.centerX
    this.centerY = this.target.centerY
  }, 1000 / perSecond)
}

LockedCircle.prototype.draw = function() {
  new Printer().stroke(this.getBody(), 3, this.color)
}

// LockedCircle.prototype.getBody = function() {}
export default LockedCircle
