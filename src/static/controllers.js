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

const player_1 = {
  up: ['ArrowUp'],
  down: ['ArrowDown'],
  right: ['ArrowRight'],
  left: ['ArrowLeft'],
  fire: ['0'],
  fireMode: ['.'],
  weapon: ['1'],
  health: ['2'],
  map: ['3']
}

export default {
  player_0: new Controller(player_0),
  player_1: new Controller(player_1)
}
