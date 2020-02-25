import ObjectItem from './ObjectItem'
const Bullet = function (config) {
  ObjectItem.call(this, config)
  setTimeout(() => this.setDestroyed(true), 10000)
}
Object.assign(Bullet.prototype, ObjectItem.prototype)

Bullet.prototype.config_default = Bullet.config_default = Object.assign(
  {},
  Bullet.prototype.config_default,
  {
    name: 'bullet',
    shape: 'rectangle',
    color: 'red',
    aimAble: false,
    // 开火频率
    firePerSecond: 0
  }
)
export default Bullet
