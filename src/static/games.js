// 游戏模式 # 保存各种游戏模式的执行程序 # 放到index.js的最后一个import
import Printer from '../lib/Printer'
import controllers from './controllers'
import configs from './configs'
import GlobalItem from '../lib/GlobalItem'
import Ship from '../object/Ship'
import ObjectItem from '../object/ObjectItem'
import Plane from '../math/Plane'
import LockedCircle from '../object/UI/LockedCircle'
import Health from '../object/UI/Health'

window.GlobalItem = GlobalItem

export default {
  test() {
    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()

    const player_controller = controllers.player_0
    player_controller.load()

    const player = new Ship(configs.player)
    player.setBulletType('bullet_track')

    player.setCenter({
      x: Printer.canvas.width / 2,
      y: Printer.canvas.height / 2
    })

    player.manual(player_controller)


    const item = new ObjectItem(configs.box_test)
    item.health = 100
    item.maxHealth = 100

    new Health(item, 'targetTop')

    item.setCenter({ x: 100, y: 100 })

    printer.render(() => {
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  },
}
