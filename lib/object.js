// 需要外界录入公共的方法名
// # move 玩家中心点移动
// # draw 绘制玩家

//#region  玩家对象

window.Ship = function (config, tailFlame) {
  tailFlame = tailFlame || {}
  config = config || {}
  this.config = {
    shape: 'triangle',
    color: '#FFF',
    center: { x: 100, y: 100 },
    height: 20,
    width: 10,
    angle: 90,
    acceleration: 0.1,
    speed: 0,
    maxSpeed: 6,
    turnSpeed: 6,
    border: {
      x: 600, y: 600
    }
  }

  //#region 配置
  let _config = this.config
  Object.defineProperty(this.config, 'speed', {
    set(speed) {
      if (speed < 0) {
        _config._speed = 0
      } else if (speed > _config.maxSpeed) {
        _config._speed = _config.maxSpeed
      } else {
        _config._speed = speed
      }
    },
    get() {
      return _config._speed || 0
    }
  })
  Object.defineProperty(this.config, 'angle', {
    set(angle) {
      if (_config._speed === 0) {
        return
      }
      _config._angle = angle % 360
      if (angle < 0) {
        _config._angle = 360 + _config._angle
      }
    },
    get() {
      return _config._angle || 0
    }
  })
  Object.defineProperty(this.config, 'center', {
    set(center) {
      if (_config._center === undefined) {
        _config._center = { x: 0, y: 0 }
        Object.defineProperty(_config._center, 'x', {
          set(x) {
            if (x > _config.border.x) {
              _config._center._x = _config.border.x
            } else if (x < 0) {
              _config._center._x = 0
            } else {
              _config._center._x = x
            }
          },
          get() {
            return _config._center._x
          }
        })
        Object.defineProperty(_config._center, 'y', {
          set(y) {
            if (y > _config.border.y) {
              _config._center._y = _config.border.y
            } else if (y < 0) {
              _config._center._y = 0
            } else {
              _config._center._y = y
            }
          },
          get() {
            return _config._center._y
          }
        })
      }
      Object.assign(_config._center, center)
    },
    get() {
      return _config._center
    }
  })
  Object.assign(this.config, { angle: 90, speed: 0 }, config)
  //#endregion 配置

  // 尾焰
  this.tailFlame = {
    shape: 'triangle',
    color: tailFlame.red || 'red',
    center: { x: 0, y: 0 },// 相对于飞船的尾部
    height: this.config.height * 0.6 * 0,
    width: this.config.width * 0.8 * 0,
    angle: this.config.angle + 180,
  }
  // 从飞船发射的子弹
  this.bullets = []
  let timers = {}
  Acction = function (key, action, tnterval) {
    this.keydown = () => {
      if (timers[key]) {
        return
      }
      timers[key] = setInterval(action, tnterval || 1000 / 60)
    }
    this.keyup = () => {
      clearInterval(timers[key])
      timers[key] = null
    }
  }
  // 操作
  this.actions = {
    up: new Acction('up', () => {
      _config.speed += _config.acceleration

      this.tailFlame.width = this.config.width * 0.8 * (_config.speed / _config.maxSpeed)
      this.tailFlame.height = this.config.height * 0.6 * (_config.speed / _config.maxSpeed)
    }),
    down: new Acction('down', () => {
      _config.speed -= _config.acceleration
      this.tailFlame.width = this.config.width * 0.8 * (_config.speed / _config.maxSpeed)
      this.tailFlame.height = this.config.height * 0.6 * (_config.speed / _config.maxSpeed)
    }),
    left: new Acction('left', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle += da
      this.tailFlame.angle += da
    }),
    right: new Acction('right', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle -= da
      this.tailFlame.angle -= da
    }),
    fire: new Acction('fire', () => {
      this.bullets.push(new Bullet({
        color: '#FFF',
        center: this.fire(),
        angle: this.config.angle,
        speed: this.config.maxSpeed * 1.5,
        border: this.config.border
      }))
      this.bullets = this.bullets.filter(e => !e.destroyed)
    }, 1000 / 5)

  }
}
//#region  外界录入

// 移动
window.Ship.prototype.move = function () { }
// 绘制
window.Ship.prototype.draw = function () { }
// 加载操作
window.Ship.prototype.load = function () { }
// 发射导弹 返回一个导弹坐标参数
window.Ship.prototype.fire = function () { }
//#endregion
//#endregion

//#region  子弹对象

window.Bullet = function (config) {
  this.config = {
    shape: 'rectangle',
    color: '#FFF',
    center: { x: 100, y: 100 },
    height: 3,
    width: 1,
    angle: 90,
    acceleration: 0.1,
    speed: 0,
    border: {
      x: 600, y: 600
    },
    destroyed: false
  }
  Object.assign(this.config, config)
  const timer = setInterval(() => {
    if (this.config.center.x > this.config.border.x || this.config.center.x < 0) {
      this.config.destroyed = true
      clearInterval(timer)
    }
    if (this.config.center.y > this.config.border.y || this.config.center.y < 0) {
      this.config.destroyed = true
      clearInterval(timer)
    }
    this.move()

  }, 1000 / 60)
}
//#region  外界录入

window.Bullet.prototype.move = function () { }

//#endregion
//#endregion