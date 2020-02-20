window.Control_Player_0 = {
  'up': {
    key: ['w', 'W'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'down': {
    key: ['s', 'S'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'left': {
    key: ['a', 'A'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'right': {
    key: ['d', 'D'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'fire': {
    key: ['f', 'F', ' '],
    keydown:[],
    keypress:[],
    keyup:[],
  }
}
const actions=['keydown','keyup','keypress']
actions.forEach(action=>{
  window.addEventListener(action, (e) => {
    for (let i in window.Control_Player_0) {
      if (window.Control_Player_0[i].key.indexOf(e.key) !== -1) {
        for(let k in window.Control_Player_0[i][action]){
          window.Control_Player_0[i][action][k]()
        }
      }
    }
  })
})