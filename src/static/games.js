// 游戏模式 # 保存各种游戏模式的执行程序 # 放到index.js的最后一个import
import Printer from '../lib/Printer' // 绘制工具
import controllers from './controllers'// 控制器
import configs from './configs'// 共用配置文件  保存玩家，敌人，物品，子弹等配置
import GlobalItem from '../lib/GlobalItem'//全局对象管理工具 添加删除 全局物品，飞船子弹玩家等
import Ship from '../object/Ship' //飞船类
import ObjectItem from '../object/ObjectItem'//基本类

window.GlobalItem = GlobalItem

export default {
  test() {
    // 设置全局画布
    Printer.setGlobalCanvas(window.canvas)
    const printer = new Printer()
    // 加载控制器
    const player_controller = controllers.player_0
    player_controller.load()
    // 生成玩家飞船
    const player = new Ship(configs.player)
    player.setBulletType('bullet_track')
    // 设置飞船初始位置
    player.setCenter({
      x: Printer.canvas.width / 2,
      y: Printer.canvas.height / 2
    })
    // 加载玩家手动操作功能
    player.manual(player_controller)

    // 生成无人问津的小物件
    const item = new ObjectItem(configs.box_test)
    // 设置物件初始坐标
    item.setCenter({ x: 100, y: 100 })
    // 渲染画布
    printer.render(() => {
      // 遍历全局对象 挨个绘制
      window.GlobalItem.getItems().forEach(item => {
        item.draw()
      })
    })
  },
}
