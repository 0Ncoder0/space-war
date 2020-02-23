// 开关控制器,是否展示FPS之类的
const FlagSwitcher = function() {}
// static
FlagSwitcher.prototype.addFlag = FlagSwitcher.addFlag = function(flag) {
  window.flags = window.flags || []
  window.flags.find(e => e === flag) || window.flags.push(flag)
}

FlagSwitcher.prototype.setFlag = FlagSwitcher.setFlag = function(flag, state) {
  window[flag] = state
}

FlagSwitcher.prototype.getFlag = FlagSwitcher.getFlag = function(flag) {
  return window[flag]
}

export default FlagSwitcher