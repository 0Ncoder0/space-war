const FlagSwitcher = function() {}
// static
FlagSwitcher.prototype.addFlag = FlagSwitcher.addFlag = function(flag) {
  window.flags = window.flags || []
  window.flags.find(flag => flag === flag) || window.flags.push(flag)
}
