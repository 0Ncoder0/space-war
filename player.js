// 需要外界录入公共的方法名
// # move 玩家中心点移动
// # draw 绘制玩家

//#region  玩家对象

window.Ship = function (config) {
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
  let timers = {}
  Acction = function (key, action) {
    this.keydown = () => {
      if (timers[key]) {
        return
      }
      timers[key] = setInterval(action, 1000 / 60)
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
    }),
    down: new Acction('down', () => {
      _config.speed -= _config.acceleration
    }),
    left: new Acction('left', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle += da
    }),
    right: new Acction('right', () => {
      const da = _config.speed / _config.maxSpeed * _config.turnSpeed
      _config.angle -= da
    }),
    fire:new Acction('fire',()=>{

    })

  }
}

//#endregion

//#region  外界录入

// 移动
window.Ship.prototype.move=function(){}
// 绘制
window.Ship.prototype.draw=function(){}
// 加载操作
window.Ship.prototype.load=function(){}

//#endregion

window.Bullet=function(config){
  this.config={
    shape: '',
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
}
