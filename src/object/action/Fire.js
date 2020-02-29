
// 开火功能
import configs from '../../static/configs'
import Point from '../../math/Point'
import Bullet from '../Bullet'
const Fire = function () { }

Fire.prototype.config_default = Fire.config_default = {
    bulletType: 'bullet_normal', //子弹类型
    openFire: false, //控制开火
    firePerSecond: 6, //开火频率 次/秒
    ammo: 699, //弹药数
    lastFireTime: 0
}
Fire.prototype.fire = function () {
    if (this.ammo <= 0 || !this.openFire) {
        return
    }
    const interval = 1000 / this.firePerSecond
    const time = new Date()
    if (time - this.lastFireTime < interval) {
        return
    }
    this.lastFireTime = time
    
    const config = configs['bullet_normal']
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
Fire.prototype.setBulletType = function (val) {
    this.bulletType = val
    this.firePerSecond = configs[val].firePerSecond
}
Fire.prototype.firePerSecond = function (val) {
    this.firePerSecond = val
}
export default Fire