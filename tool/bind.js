// 把配置中文件夹的 JS 文件和根目录下的 ./main.js 捆绑打包到 ./dist/index.js
// 把 ./public/ 目录下的文件复制到 ./dist/ 并在 ./dist/index.html 中引用 ./dist/index.js
const Fs = require('fs')
const Path = require('path')
const folders = require(Path.join(__dirname, '../config.json')).folders
bindForAll()

let param = process.argv[2] || ''
if (param && param === 'auto') {
  autoBind()
}

// 自动打包，监听文件改变自动打包
function autoBind() {
  const jsFileList = []
  folders.forEach(e => getAllJs(e, jsFileList))
  console.log(jsFileList)
  const watcher = new FileStatusWatcher(jsFileList)
  setInterval(() => {
    if (watcher.isChanged()) {
      console.info("-----监听到文件改变，自动打包-----")
      bindForAll()
    }
  }, 100)
}
// 文件状态监听器
function FileStatusWatcher(fileList) {
  this.fileList = fileList.map(e => {
    return { path: e, stat: Fs.statSync(e) }
  })
  this.isChanged = function () {
    let isChanged = false
    this.fileList = this.fileList.map(e => {
      const stat = Fs.statSync(e.path)
      if (e.stat.mtimeMs !== stat.mtimeMs) {
        console.log(stat.mtimeMs)
        isChanged = true
      }
      return {
        path: e.path, stat
      }
    })
    return isChanged
  }
}
// 打包所有文件
function bindForAll() {
  try {
    console.info('----------打包 index.html----------')
    bindForHtml()
  } catch (error) {
    console.error('-------无法读取根目录下的 ./public/index.html 文件')
    throw error
  }
  try {
    console.info('----------打包 index.js----------')
    bindForJS()
  } catch (error) {
    console.error('-------根目录下的 ./public/index.js 文件 生成失败')
    throw error
  }
}
// 打包 index.html 
function bindForHtml() {
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
}
// 打包 index.js 
function bindForJS() {
  const fileList = []
  folders.forEach(e => {
    getAllJs(Path.join(__dirname, '../', e), fileList)
  })
  try {
    Fs.unlinkSync(Path.join(__dirname, '../dist/index.js'))
  } catch (error) {
    Fs.writeFileSync(Path.join(__dirname, '../dist/index.js'))
  }
  fileList.forEach(e => {
    const JS = Fs.readFileSync(e).toString() + '\n'
    console.info(JS)
    if (JS) {
      Fs.appendFileSync(Path.join(__dirname, '../dist/index.js'), JS)
    }
  })
  const JS = Fs.readFileSync(Path.join(__dirname, '../index.js')).toString() + '\n'
  console.info(JS)
  Fs.appendFileSync(Path.join(__dirname, '../dist/index.js'), JS)
}
// 获取目录下所有JS文件路径
function getAllJs(path, list) {
  try {
    const folders = Fs.readdirSync(path)
    console.info('读取文件夹---' + path)
    folders.forEach(e => {
      getAllJs(Path.join(path, e), list)
    })
  } catch (error) {
    console.info('添加文件路径---' + path)
    list.push(path)
  }
}
