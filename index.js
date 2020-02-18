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
let angle = 90
setInterval(()=>{
  draw.fill(view,'#000')
  crossLine(canvas,ctx)
  render()
},1000/60)
function render(){
  let triangle=Point.circle({
    center:{x:width/2,y:height/2},
    radius:20
  })
  draw.fill(triangle,'#FFF')
}
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