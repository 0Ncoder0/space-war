import Printer from '../lib/Printer'
const printer = new Printer()
const fun = {
  height: 10,
  width: 3,
  angle: 270,
  centerX: 75,
  centerY: 300,
  borderX: printer.width,
  borderY: printer.height,
  // 移动速度
  acceleration: 1000, //加速度 像素/秒^2
  speed: 0, // 像素/秒
  maxSpeed: 10000, // 像素/秒
  maxBackwardSpeed: 0, //最大的倒车速度
  // 转向速度
  turnAcceleration: 250, //转向加速度 角度/秒^2
  turnSpeed: 0, // 转向速度 角度/秒
  maxTurnSpeed: 6000 // 角度/秒
}
const player = {
  height: 20,
  width: 15,
  angle: 90,
  centerX: printer.width / 2,
  centerY: printer.height / 2,
  borderX: printer.width,
  borderY: printer.height,
  // 移动速度
  acceleration: 100 * 2, //加速度 像素/秒^2
  speed: 0, // 像素/秒
  maxSpeed: 200 * 2, // 像素/秒
  maxBackwardSpeed: 0, //最大的倒车速度
  // 转向速度
  turnAcceleration: 360, //转向加速度 角度/秒^2
  turnSpeed: 0, // 转向速度 角度/秒
  maxTurnSpeed: 360 // 角度/秒
}
const bullet_normal = {
  shape: 'rectangle',
  height: 10,
  width: 3,
  color: 'red',

  centerX: 0,
  centerY: 0,
  borderX: 0,
  borderY: 0,
  angle: 0,
  // 移动速度
  acceleration: 0, //加速度 像素/秒^2
  speed: 0, // 像素/秒
  maxSpeed: 0, // 像素/秒
  maxBackwardSpeed: 0, //最大的倒车速度
  // 转向速度
  turnAcceleration: 0, //转向加速度 角度/秒^2
  turnSpeed: 0, // 转向速度 角度/秒
  maxTurnSpeed: 0 // 角度/秒
}
export default {
  fun,
  player,
  bullet_normal
}
