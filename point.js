window.Point = {

  // 中心点，高，宽，角度 // angle 角度
  triangle({ center, height, width, angle }) {
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const baseCenter=util.getPoint(center,util.toRadian(angle+180),height/2)//底边中心点
    return [
      util.getPoint(center,util.toRadian(angle),height/2),//顶点
      util.getPoint(baseCenter,util.toRadian(angle+90),width/2),//右底边点
      util.getPoint(baseCenter,util.toRadian(angle-90),width/2),//左底边点
    ]
  },
  // 中心点，高，宽，角度 // angle 角度
  rectangle({ center,height,width,angle }){
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const topCenter= util.getPoint(center,util.toRadian(angle),height/2) //上边中心点
    const topLeft= util.getPoint(topCenter,util.toRadian(angle+90),width/2) // 左上角顶点
    const topRight=util.getPoint(topCenter,util.toRadian(angle-90),width/2) // 右上角顶点
    const bottomLeft= util.getPoint(topLeft,util.toRadian(angle+180),height) // 左下角顶点
    const bottomRight=util.getPoint(topRight,util.toRadian(angle+180),height) // 右下角顶点
    return [topLeft,topRight,bottomRight,bottomLeft]
  },
  // 中心点，半径
  circle({center,radius}){
    const util=this.util
    let points=[]
    for(let i=0;i<=360;i++){
      points.push(util.getPoint(center,util.toRadian(i),radius))
    }
    return points
  },
  util:{
    // 根据点坐标，角度和距离获取新点坐标 //angle 弧度
    getPoint(point, angle, length) {
      return {
        x: point.x+Math.cos(angle)*length,
        y: point.y+Math.sin(angle)*length
      }
    },
    // 转换角度到弧度
    toRadian(angle) {
      return angle / 360 * 2 * Math.PI
    },
    // 获取两点之间的距离
    getLengthOfPoints(a,b) {
      const dx = Math.abs(a.x - b.x)
      const dy = Math.abs(a.y - b.y)
      return Math.sqrt(dx * dx + dy * dy)
    }
  },
}