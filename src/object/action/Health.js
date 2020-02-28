
import GlobalItem from '../../lib/GlobalItem'
// 没有主体，需要被继承才能使用
const Health = function () { }

Health.prototype.config_default = Health.config_default = {
    //血量
    maxHealth: 0, //最大生命值
    health: 0, //生命值 //在撞击时也是对敌方的伤害值
    armor: 0, //护甲 # 受到的伤害 = 取大于零的(伤害 - 护甲)
    openCollisionDetection: true, //是否开启碰撞检测关闭后不会被检测到
    openDamageDetection: true, //开关伤害检测,关闭则不掉血
}
// 碰撞检测
Health.prototype.collisionDetection = function () {
    if (!this.openCollisionDetection) return

    const points = this.getBody()
    const plane = new Plane(points)
    
    GlobalItem.getItems().forEach(item => {
        if (!item.openCollisionDetection || item.id === this.id) return

        const isCrossed = Plane.isCrossed(plane, new Plane(item.getBody()))
        if (isCrossed) {
            console.info('检测到碰撞 id 为', this.id, item.id)
            //顺序不能乱
            const _item = Object.assign({}, item)
            item.onCollision(Object.assign({}, this))
            this.onCollision(Object.assign({}, _item))
        }
    })
}
//撞击时触发
Health.prototype.onCollision = function (target) {
    this.onHit(target.health)
}
// 受到攻击时触发
Health.prototype.onHit = function (damage) {
    if ((this.openDamageDetection = false)) {
        return
    }
    damage -= this.armor
    this.health -= damage > 0 ? damage : 0
    if (this.health <= 0) {
        this.setDestroyed(true)
    }
}