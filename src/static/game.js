// 游戏模式 # 保存各种游戏模式的执行程序 # 放到index.js的最后一个import
import Printer from '../lib/Printer'
import controllers from './controllers'
import configs from './configs'
import GlobalItem from '../lib/GlobalItem'
import Ship from '../object/Ship'
import ObjectItem from '../object/ObjectItem'
import Plane from '../math/Plane'
import LockedCircle from '../object/LockedCircle'
window.GlobalItem = GlobalItem

const Game = {
  test() {
    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()

    const player_controller = controllers.player_0
    player_controller.load()

    // const itemA = new ObjectItem(configs.box_test)
    // itemA.setCenter({
    //   x: 300, y: 300
    // })

    const player = new Ship(configs.player)
    player.setBulletType('bullet_track')

    player.manual(player_controller)


    const enemy = new Ship(configs.player)
    enemy.setCenter({
      x: 100, y: 400
    })
    enemy.auto()
    Object.assign(enemy, {
      target: player,
      // openTrack: true,
      turnAcceleration: -80,
      turnSpeed: 80,
      maxTurnSpeed: 80,
      maxSpeed: 500,
      maxHealth: 1000, //最大生命值
      health: 1000, //生命值 //在撞击时也是对敌方的伤害值
      // openFire: true
    })

    printer.render(() => {
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  },
  heart() {
    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()

    const player_controller = controllers.player_0
    player_controller.load()

    // ----------------
    configs.box_test.openCollisionDetection = false
    configs.box_test.openDamageDetection = false
    configs.box_test.height = 1
    configs.box_test.width = 1
    const itemA = new ObjectItem(configs.box_test)
    itemA.setCenter({
      x: printer.width / 2 + 1, y: printer.height - 10
    })

    const itemB = new ObjectItem(configs.box_test)
    itemB.setCenter({
      x: printer.width / 2 - 1, y: printer.height - 10
    })
    // ----------------

    const player = new Ship(configs.player)
    player.setBulletType('bullet_heart')
    player.manual(player_controller)
    player.openFire = true
    player.target = itemA
    setInterval(() => {
      player.target = player.target.id === itemA.id ? itemB : itemA
      window.GlobalItem.getItems().forEach(item => {
        item.openCollisionDetection = false
        item.openDamageDetection = false
      })
    }, 1);

    printer.render(() => {
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  }
}
export default Game
