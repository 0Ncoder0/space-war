import ObjectItem from './ObjectItem'
const Bullet = function(config) {
  ObjectItem.call(this, config)
}
Object.assign(Bullet.prototype, ObjectItem.prototype)

Bullet.prototype.config_default = Bullet.config_default = Object.assign(
  {},
  Bullet.prototype.config_default,
  {
    name: 'bulet',
    shape: 'rectangle',
    color: 'red'
  }
)
export default Bullet
