// 保存控制器配置
import Controller from '../lib/Controller'

const player_0 = {
  up: ['w', 'W'],
  down: ['s', 'S'],
  right: ['d', 'D'],
  left: ['a', 'A'],
  fire: ['f', 'F', ' '],
  fireMode: ['Alt'],
  weapon: ['Shift'],
  health: ['h', 'H'],
  map: ['m', 'M']
}

export default {
  player_0: new Controller(player_0)
}
