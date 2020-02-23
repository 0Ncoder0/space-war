// 自动化某些操作 # 必须由ObjectItem的派生类调用

const AI = function() {}

// 跟随目标 # 修改ObjectItem的加速度和转向速度 # prediction 是否开启跟随预判 # 用于跟踪导弹和敌人AI
AI.prototype.follow = function(target, prediction) {}

// 瞄准本体前方一定角度和范围内的最近目标 # 用于辅助瞄准和设置跟踪导弹目标
AI.prototype.aim = function(center, angle, distance) {}
