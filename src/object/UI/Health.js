
import Printer from '../../lib/Printer'
import Point from '../../math/Point'
import GlobalItem from '../../lib/GlobalItem'
import ObjectItem from '../ObjectItem'
// position:targetTop,windowTop,windowLeftBottom
const Health = function (target, position) {
    ObjectItem.call(this, {})
    this.position = position || 'targetTop'
    this.target = target

    let health = this
    let setDestroyed = this.target.setDestroyed
    this.target.setDestroyed = function (val) {
        setDestroyed.call(target, val)
        health.setDestroyed(val)
    }
}
Object.assign(Health.prototype, ObjectItem.prototype)

Health.prototype.config_default = Health.config_default = {
    name: 'health',
    color: 'green',
    backgroundColor: 'gray'
}
Health.prototype.getBody = function () {

    const position = this.position
    const target = this.target
    const distanceToTarget = 30
    const maxWidth = 500
    const maxHealth = 1000
    const angle = 90
    const height = 5
    const width = target.maxHealth > maxHealth ? 500 : target.maxHealth / maxHealth * maxWidth
    const leftWidth = width * target.health / target.maxHealth
    const center = {
        x: target.centerX,
        y: target.centerY,
    }
    const rectangleCenter = Point.getPoint(center, Point.toRadian(-90), distanceToTarget)
    const max = Point.rectangle({
        center: rectangleCenter,
        height, width, angle
    })
    const left = Point.rectangle({
        center: {
            x: rectangleCenter.x - (width - leftWidth) / 2,
            y: rectangleCenter.y
        },
        height, width: leftWidth, angle
    })
    return {
        max, left
    }

}
Health.prototype.draw = function () {
    const printer = new Printer()
    const bodys = this.getBody()
    printer.fill(bodys.max, this.backgroundColor)
    printer.fill(bodys.left, this.color)
}

export default Health