window.Control = {
  'up': {
    key: ['w', 'W', 'up'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'down': {
    key: ['s', 'S', 'down'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'left': {
    key: ['a', 'A', 'left'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'right': {
    key: ['d', 'D', 'right'],
    keydown:[],
    keypress:[],
    keyup:[],
  },
  'fire': {
    key: ['f', 'F', ' '],
    keydown:[],
    keypress:[],
    keyup:[],
  },
}
const actions=['keydown','keyup','keypress']
actions.forEach(action=>{
  window.addEventListener(action, (e) => {
    for (let i in window.Control) {
      if (window.Control[i].key.indexOf(e.key) !== -1) {
        for(let k in window.Control[i][action]){
          window.Control[i][action][k]()
        }
      }
    }
  })
})