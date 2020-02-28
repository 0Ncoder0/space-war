// 在目标周围设置一个圈表示锁定 # 没有其他作用
import ObjectItem from '../ObjectItem'
import Printer from '../../lib/Printer'
const LockedCircle = function (target) {
  ObjectItem.call(this, {})
  this.target = target
  this.radius = target.height > target.width ? target.height : target.width
  this.animation()

  let lockedCircle = this
  let setDestroyed = this.target.setDestroyed
  this.target.setDestroyed = function (val) {
    setDestroyed.call(this, val)
    lockedCircle.setDestroyed(val)
  }
}

Object.assign(LockedCircle.prototype, ObjectItem.prototype)

LockedCircle.prototype.config_default = LockedCircle.config_default = {
  name: 'lockedCircle',
  shape: 'circle',
  color: 'red',
}
LockedCircle.prototype.getBody = function () {
  this.centerX = this.target.centerX
  this.centerY = this.target.centerY
  return ObjectItem.prototype.getBody.call(this)
}
LockedCircle.prototype.draw = function () {
  new Printer().stroke(this.getBody(), this.color)
}
LockedCircle.prototype.animation = function () {
  const target = this.target
  let rate = 0.8
  let rateChange = 0.005
  let radius = 0
  const timer = setInterval(() => {
    if (this.destroyed) {
      clearInterval(timer)
      return
    }
    if (rate > 1 || rate < 0.8) {
      rateChange = - rateChange
    }
    radius = target.height > target.width ? target.height : target.width
    rate += rateChange
    this.radius = radius * rate

  }, 10)
}
export default LockedCircle
