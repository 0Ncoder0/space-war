window.Point = {

  // 顶点，高，底边，角度 // angle 弧度
  triangle({ center, height, width, angle }) {
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const baseCenter=util.getPoint(center,util.toPiAngle(angle+180),height/2)//底边中心点
    return [
      util.getPoint(center,util.toPiAngle(angle),height/2),//顶点
      util.getPoint(baseCenter,util.toPiAngle(angle+90),width/2),//右底边点
      util.getPoint(baseCenter,util.toPiAngle(angle-90),width/2),//左底边点
    ]
  },
  rectangle({ center,height,width,angle }){
    angle=angle===0?angle:( -angle||90 )
    const util=this.util
    const topCenter= util.getPoint(center,util.toPiAngle(angle),height/2) //上边中心点
    const topLeft= util.getPoint(topCenter,util.toPiAngle(angle+90),height/2) // 左上角顶点
    const topRight=util.getPoint(topCenter,util.toPiAngle(angle-90),height/2) // 右上角顶点
    const bottomLeft= util.getPoint(topLeft,util.toPiAngle(angle+180),width) // 左下角顶点
    const bottomRight=util.getPoint(topRight,util.toPiAngle(angle+180),width) // 右下角顶点
    return [topLeft,topRight,bottomRight,bottomLeft]
  },
  circle({center,radius}){
    const util=this.util
    let points=[]
    for(let i=0;i<=360;i++){
      points.push(util.getPoint(center,util.toPiAngle(i),radius))
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
    toPiAngle(angle) {
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