import FlagSwitcher from './FlagSwitcher'
const Controller = function(controls) {
  this.actions = []
  for (let k in controls) {
    let action = {
      name: k,
      keys: controls[k]
    }
    this.events.forEach(e => {
      action[e] = []
    })
    this.actions.push(action)
  }
}
//#region  static

Controller.prototype.events = Controller.events = ['keydown', 'keyup', 'keypress']

//#endregion
//#region public

// 挂载控制器
Controller.prototype.load = function() {
  // 遍历事件
  this.events.forEach(event => {
    // 监听事件
    window.addEventListener(event, e => {
      if (window.showEventKey) console.info(e.key)
      // 执行对应操作
      const act = this.actions.find(action => action.keys.find(k => k === e.key))
      if (act) {
        act[event].forEach(d => d())
      }
    })
  })
}
// 挂载操作
Controller.prototype.addAction = function(name, event, action) {
  this.actions.find(action => action.name == name)[event].push(action)
}
// 清理操作
Controller.prototype.clearAction = function(name, event) {
  this.actions.find(action => action.name == name)[event] = []
}

//#endregion public

export default Controller
