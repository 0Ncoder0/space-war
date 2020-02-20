// 把配置中文件夹的 JS 文件和根目录下的 ./main.js 捆绑打包到 ./dist/index.js
// 把 ./public/ 目录下的文件复制到 ./dist/ 并在 ./dist/index.html 中引用 ./dist/index.js
const Fs = require('fs')
const Path = require('path')
const folders = require(Path.join(__dirname, '../config.json')).folders

//#region 打包 index.html 
try {
  (function () {
    console.info('----------打包 index.html----------')
    const index_html = Fs.readFileSync(Path.join(__dirname, '../public/index.html')).toString()
    const lines = index_html.split('\n')
    for (let i = lines.length; i--;) {
      if (lines[i].indexOf('</html') !== -1) {
        lines[i] = `<script src="./index.js"></script>\n` + lines[i]
        break
      }
    }
    const output = lines.join('\n')
    console.info(output)
    Fs.writeFileSync(Path.join(__dirname, '../dist/index.html'), output)
  }())
} catch (error) {
  console.error('-------无法读取根目录下的 ./public/index.html 文件')
  throw error
}
//#endregion

//#region 打包 index.js
try {
  console.info('----------打包 index.js----------')
  const fileList = []
  folders.forEach(e => {
    getAllJs(Path.join(__dirname, '../', e))
  })
  try {
    Fs.unlinkSync(Path.join(__dirname, '../dist/index.js'))
  } catch (error) {
    Fs.writeFileSync(Path.join(__dirname, '../dist/index.js'))
  }
  fileList.forEach(e => {
    const JS = Fs.readFileSync(e).toString()+'\n'
    console.info(JS)
    if(JS){
      Fs.appendFileSync(Path.join(__dirname,'../dist/index.js'),JS)
    }
  })
  const JS = Fs.readFileSync(Path.join(__dirname,'../index.js')).toString()+'\n'
  console.info(JS)
  Fs.appendFileSync(Path.join(__dirname,'../dist/index.js'),JS)
  // 获取所有JS文件路径
  function getAllJs(path) {
    try {
      const folders = Fs.readdirSync(path)
      console.info('读取文件夹---' + path)
      folders.forEach(e => {
        getAllJs(Path.join(path, e))
      })
    } catch (error) {
      console.info('添加文件路径---' + path)
      fileList.push(path)
    }
  }
} catch (error) {
  console.error('-------根目录下的 ./public/index.js 文件 生成失败')
  throw error
}
//#endregion