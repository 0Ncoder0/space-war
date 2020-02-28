
// 没有主体，需要被继承才能使用
const AI = function () { }

AI.prototype.config_default = AI.config_default = {
    openAim: false,//开关瞄准功能
    aimAble: true,//能否被瞄准
    openTrack: false,//开关跟踪模式
    target: null,//瞄准的目标
}
// 跟随目标 # 修改ObjectItem的加速度和转向速度 # prediction 是否开启跟随预判 # 用于跟踪导弹和敌人AI
AI.prototype.track = function () {
    if (!this.openTrack) return
    if (this.target === null || this.target.destroyed) {
        this.setTurnSpeed(0)
        return
    }

    this.acceleration = this.acceleration
    let angle = - Point.getAngle({
        x: this.centerX, y: this.centerY
    }, {
        x: this.target.centerX, y: this.target.centerY
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
AI.prototype.aim = function () {
    const height = 1000
    const width = 600

    const center = Point.getPoint(
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
    //   扫描面
    const range = new Plane(points)

    let closestDistance = null
    let findTarget = false
    //   范围内最近的目标
    GlobalItem.getItems().forEach(item => {
        if (!item.aimAble || item.id === this.id) {
            return
        }
        const center = {
            x: item.centerX,
            y: item.centerY
        }
        if (range.isInnerPoint(center)) {
            const distance = Point.getDistance(center, { x: this.centerX, y: this.centerY })
            if (closestDistance === null || distance < closestDistance) {
                closestDistance = distance
                findTarget = true
                this.target = item
            }
        }
    })
    findTarget || (this.target = null)
}