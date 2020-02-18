const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const height=canvas.clientHeight//600
const width=canvas.clientWidth//600
const draw = new Draw(ctx)

const view=Point.rectangle({
  center:{x:width/2,y:height/2},
  height:height,
  width:width, 
  angle:90
})

// 每帧执行一次清除和渲染
setInterval(()=>{
  draw.fill(view,'#000')
  crossLine(canvas,ctx)
  render()
},1000/60)
// 渲染方法
let angle = 90
function render(){
  let rectangle=Point.rectangle({
    center:{x:width/2,y:height/2},
    height:20,
    width:200,
    angle:angle
  })
  let triangle=Point.triangle({
    center:{x:width/2,y:height/2},
    height:200,
    width:200,
    angle:angle
  })
  angle++

  draw.fill(triangle,'#FFF')
  // draw.fill(rectangle,'#FFF')
}
// 中心十字线
function crossLine(canvas,ctx){
  ctx.beginPath()
  ctx.moveTo(canvas.clientWidth/2,0)
  ctx.lineTo(canvas.clientWidth/2,canvas.clientHeight)
  ctx.closePath()
  ctx.strokeStyle='red'
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0,canvas.clientHeight/2)
  ctx.lineTo(canvas.clientWidth,canvas.clientHeight/2)
  ctx.closePath()
  ctx.strokeStyle='red'
  ctx.stroke()
}