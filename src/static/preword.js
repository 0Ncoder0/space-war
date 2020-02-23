// 在所有文件执行之前调用 # 请放到index.js中的第一行

const height = window.innerHeight
const width = window.innerWidth
const canvas = document.getElementById('canvas')
canvas.style.height = height + 'px'
canvas.style.width = width + 'px'
canvas.height = height
canvas.width = width
window.canvas = canvas