import './static/preword'
import Point from './lib/Point'
import Printer from './lib/Printer'
import Bullet from './object/Bullet'
import controllers from './static/controllers'
import configs from './static/configs'
import GlobalItem from './lib/GlobalItem'
import Ship from './object/Ship'

window.GlobalItem = GlobalItem

Printer.prototype.canvas = canvas
Printer.prototype.ctx = canvas.getContext('2d')

const printer = new Printer()
const player_controller = controllers.player_0
player_controller.load()
const player = new Ship(configs.player)
new Bullet()
player.manual(player_controller)
printer.render(() => {
  GlobalItem.getItems().forEach(item => {
    item.draw()
  })
})
