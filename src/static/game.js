// 游戏模式 # 保存各种游戏模式的执行程序 # 放到index.js的最后一个import
import Printer from '../lib/Printer'
import controllers from './controllers'
import configs from './configs'
import GlobalItem from '../lib/GlobalItem'
import Ship from '../object/Ship'
import ObjectItem from '../object/ObjectItem'
import Plane from '../math/Plane'
const Game = {
  test() {
    window.GlobalItem = GlobalItem

    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()

    const player_controller = controllers.player_0
    player_controller.load()

    new ObjectItem(Object.assign({}, configs.box_test, { centerX: 100, centerY: 100 })).auto()
    new ObjectItem(
      Object.assign({}, configs.box_test, { centerX: printer.width / 2, centerY: 100 })
    ).auto()
    new ObjectItem(
      Object.assign({}, configs.box_test, { centerX: printer.width - 100, centerY: 100 })
    ).auto()
    const player = new Ship(configs.player)

    player.manual(player_controller)
    player.setBulletType('bullet_normal')

    printer.render(() => {
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  },
  doublePlayerTest() {
    window.GlobalItem = GlobalItem

    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()
    // 加载控制器
    const player_controller_0 = controllers.player_0
    player_controller_0.load()
    const player_controller_1 = controllers.player_1
    player_controller_1.load()
    // 加载物品
    new ObjectItem(Object.assign({}, configs.box_test, { centerX: 100, centerY: 100 }))
    new ObjectItem(
      Object.assign({}, configs.box_test, {
        centerX: printer.width / 2,
        centerY: 100,
        height: 100,
        width: 3
      })
    )
    new ObjectItem(
      Object.assign({}, configs.box_test, { centerX: printer.width - 100, centerY: 100 })
    )
    // 加载玩家角色
    const player_0 = new Ship(
      Object.assign({}, configs.player, { centerX: configs.player.centerX + 100 })
    )
    player_0.manual(player_controller_0, 200, true)
    player_0.setBulletType('bullet_normal')

    const player_1 = new Ship(
      Object.assign({}, configs.player, { centerX: configs.player.centerX - 100 })
    )

    player_1.manual(player_controller_1, 200, true)
    player_1.setBulletType('bullet_normal')
    // 渲染程序
    printer.render(() => {
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  }
}
export default Game
