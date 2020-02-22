## ObjectItem 说明

### 属性:

```js
{
  name: 'objectItem',// item 名
  id: null, // 标识ID
  shape: 'rectangle',// 主体形状 Point 里面的方法名
  color: '#FFF',// 主体颜色
  centerX: 0,// 中心X坐标
  centerY: 0,// 中心Y坐标
  borderX: 0,// 最大X坐标值
  borderY: 0,// 最大Y坐标值
  height: 0,// 主体高度
  width: 0,// 主体宽度
  angle: 0,// 主体角度 PS:Y轴方向为270度,X轴方向为0度
  // 移动速度
  acceleration: 0, //加速度 像素/秒^2
  speed: 0, // 像素/秒
  maxSpeed: 0, // 像素/秒
  maxBackwardSpeed: 0, //最大的倒车速度
  // 转向速度
  turnAcceleration: 0, //转向加速度 角度/秒^2
  turnSpeed: 0, // 转向速度 角度/秒
  maxTurnSpeed: 0, // 角度/秒

  interval: 1000 / 100, //自动模式下的数据刷新间隔 PS:根据相关参数修改主体位置及方向数据
  destroyed: false // 是否已经销毁,销毁后删除全局指向,停止相关计时器
}
```

### 公有属性:

```js
{
    config_default:{},//默认配置参数
}
```

### 公有方法:

```js
{
    move(distance,angle){},//根据距离和角度增量修改当前对象的坐标及方向
    draw(){},//调用Printer类中的绘制函数在画布中绘制对象
    auto(){},//挂载计时器,按照一定频率调用move方法,对象销毁后清理计时器
    getBody(){},//获取当前主体的顶点坐标数组
    setters(){},//设置属性的方法,主要是对属性的参数进行监听和修改,比如出界后调用销毁函数
}
```

## ObjectItem 的继承方法说明

### 例子

```js
import ObjectItem from './ObjectItem'
const Child = function(config) {
  ObjectItem.call(this, config)
  // # 此对象的构造函数代码
  this.
  // #

}
// 复制父对象的公有函数
Object.assign(Ship.prototype, ObjectItem.prototype)
// 修改默认配置对象
Child.prototype.config_default = Ship.config_default = Object.assign(
  {},
  Child.prototype.config_default,
  {
    name: 'Child',
    shape: 'triangle',
    color: '#FFF'
  }
)

// 全对象共用属性
Child.count = 0 //new Child 的 计数器
// 公有函数
Child.prototype.count=function(){
    Child.count++
}
// 覆盖父类中的函数,但是保留父类函数的内容
Child.prototype.draw=function(){
    ObjectItem.prototype.draw.call(this)
    // 下面写子类函数
    // #
}
// setter
Child.prototype.setCount=function(val){
    Child.count = val>0 ? val : 0
}
// getter
Child.prototype.getCount = function() {
  return Child.count
}
```

## Bullet 继承自 ObjectItem

```js
// 一共就这么点代码自己看
import ObjectItem from './ObjectItem'
const Bullet = function(config) {
  ObjectItem.call(this, config)
}
Object.assign(Bullet.prototype, ObjectItem.prototype)

Bullet.prototype.config_default = Bullet.config_default = Object.assign(
  {},
  Bullet.prototype.config_default,
  {
    name: 'bullet',
    shape: 'rectangle',
    color: 'red'
  }
)
export default Bullet
```

## Ship 继承自 ObjectItem

### 新增属性

```js
{
    temp:{//临时保存部分数据 # 目前用于控制器保存加速度数据
      acceleration: this.acceleration,
      turnAcceleration: this.turnAcceleration
    },
    flameColor:'red',// 尾焰颜色
    openFire:false,//控制开火
    firePerSecond:5,//开火频率 次/秒
}
```

### 新增和覆盖的方法

```js
{
    //覆盖
    auto(){},// 属性计算计时器 # 在父函数基础上新增开火计时器
    draw(){},// 绘制 # 在父函数基础上增加尾焰绘制
    //新增
    manual(controller){},// 挂载控制器手动操作 controller为控制表
    fire(){},// 在飞船头部new一个Bullet对象,设置参数并打开计时器auto
    getActions(){},// 获取不同操作的响应函数
    getFlame(color,shape){},//获取尾焰数据 { points,color }
}
```
