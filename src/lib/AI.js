// 自动化某些操作 # 必须由ObjectItem的派生类调用

import Point from '../math/Point'
import Plane from '../math/Plane'
import Line from '../math/Line'

import Printer from '../lib/Printer'
import GlobalItem from './GlobalItem'

const AI = function () { }

// 跟随目标 # 修改ObjectItem的加速度和转向速度 # prediction 是否开启跟随预判 # 用于跟踪导弹和敌人AI
AI.prototype.follow = function (target, prediction) {
    this.acceleration = this.acceleration
    let angle = - Point.getAngle({
        x: this.centerX, y: this.centerY
    }, {
        x: target.centerX, y: target.centerY
    })
    let daAngle = angle - this.angle
    daAngle = daAngle < 0 ? 360 + daAngle : daAngle
    if (daAngle <= 180) {
        this.setTurnSpeed(this.turnAcceleration)
    } else {
        this.setTurnSpeed(-this.turnAcceleration)
    }
}

// 瞄准本体前方一定角度和范围内的最近目标 # 返回目标指向 # 用于辅助瞄准和设置跟踪导弹目标
AI.prototype.aim = function (center, angle, distance) {
    const height = 1000
    const width = 600

    center = Point.getPoint(
        { x: this.centerX, y: this.centerY },
        Point.toRadian(-this.angle),
        (height + this.height) / 2 + 2
    )
    const points = Point.triangle({
        height: height,
        width: width,
        center: center,
        angle: -(this.angle + 180)
    })
    new Printer().stroke(points, 'white')
    //   扫描面
    const range = new Plane(points)

    let closestItem = null
    let closestDistance = null
    //   范围内最近的目标
    GlobalItem.getItems().forEach(item => {
        const center = {
            x: item.centerX,
            y: item.centerY
        }
        if (range.isInnerPoint(center)) {
            const distance = Point.getDistance(center, { x: this.centerX, y: this.centerY })
            if (closestDistance === null || distance < closestDistance) {
                closestDistance = distance
                closestItem = item
            }
        }
    })
    return closestItem
}

export default AI
