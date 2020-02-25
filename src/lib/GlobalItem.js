// 全局Item保存工具
const GlobalItem = function () { }

window['global_item'] = window['global_item'] || []

GlobalItem.prototype.addItem = GlobalItem.addItem = function (item) {
  window['global_item'].find(e => e.id === item.id) || window['global_item'].push(item)
}

GlobalItem.prototype.removeItem = GlobalItem.removeItem = function (item) {
  window['global_item'] = window['global_item'].filter(e => e.id !== item.id)
}

GlobalItem.prototype.getItem = GlobalItem.getItem = function (filter) {
  return window['global_item'].find(e => {
    for (let i in filter) {
      if (filter[i] !== e[i]) {
        return false
      }
    }
    return true
  })
}
GlobalItem.prototype.getItems = GlobalItem.getItems = function (filter) {
  return window['global_item'].filter(e => {
    for (let i in filter) {
      if (filter[i] !== e[i]) {
        return false
      }
    }
    return true
  })
}

export default GlobalItem
