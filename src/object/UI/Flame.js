
import Point from '../../math/Point'
import ObjectItem from '../ObjectItem'

const Flame = function (target) {
    ObjectItem.call(this, {})
    this.target = target

    let Flame = this
    let setDestroyed = this.target.setDestroyed
    this.target.setDestroyed = function (val) {
        setDestroyed.call(target, val)
        Flame.setDestroyed(val)
    }
}
Object.assign(Flame.prototype, ObjectItem.prototype)

Flame.prototype.config_default = Flame.config_default = {
    name: 'Flame',
    color: 'red',
}
Flame.prototype.getBody = function () {
    const target = this.target
    const height = (target.speed / target.maxSpeed) * target.height * 0.8
    const width = (target.speed / target.maxSpeed) * target.width * 0.8
    const angle = target.angle + 180
    const center = Point.getPoint(
        { x: target.centerX, y: target.centerY },
        Point.toRadian(-angle),
        (height + target.height) / 2
    )
    const points = Point.triangle({ height, width, angle: -angle, center })
    return points
}

export default Flame

