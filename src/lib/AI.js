// 自动化某些操作 # 必须由ObjectItem的派生类调用

import Point from '../math/Point'
import Plane from '../math/Plane'
import Line from '../math/Line'

import Printer from '../lib/Printer' 
import GlobalItem from './GlobalItem'

const AI = function() {}

// 跟随目标 # 修改ObjectItem的加速度和转向速度 # prediction 是否开启跟随预判 # 用于跟踪导弹和敌人AI
AI.prototype.follow = function(target, prediction) {}

// 瞄准本体前方一定角度和范围内的最近目标 # 用于辅助瞄准和设置跟踪导弹目标
AI.prototype.aim = function(center, angle, distance) {
  const height = 1000
  const width=600
  center = Point.getPoint(
    {x:this.centerX,y:this.centerY},
    Point.toRadian((this.angle + 180)),
    (height+this.height)/2
  )
  // console.log(center,this.centerX,this.centerY, (height+this.height)/2)
  const range= Point.triangle({
    height:height,
    width:width,
    center:center,
    angle:-(this.angle+180)
  })
  // console.log(range)
  // 在范围内的 ObjectItems

  new Printer().stroke(range,'white')
}

export default AI