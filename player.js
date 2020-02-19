window.Player = function (config) {
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
      console.log('speed', _config._speed)
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
      _config._angle = angle%360
      if(angle<0){
        _config._angle=360+_config._angle
      }
      console.log('angle', _config._angle)
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
  let timers = {
    up: null,
    down: null,
    right: null,
    left: null,
  }
  Acction=function(){}
  this.actions = {
    up: {
      keydown() {
        if (timers.up) {
          return
        }
        timers.up = setInterval(() => {
          _config.speed += _config.acceleration
        }, 1000 / 60)
      },
      keyup() {
        clearInterval(timers.up)
        timers.up = null
      },
    },
    down: {
      keydown() {
        if (timers.down) {
          return
        }
        timers.down = setInterval(() => {
          _config.speed -= _config.acceleration
        }, 1000 / 60)
      },
      keyup() {
        clearInterval(timers.down)
        timers.down = null
      },
    },
    left: {
      keydown() {
        if (timers.left) {
          return
        }
        timers.left = setInterval(() => {
          const da = _config.speed / _config.maxSpeed * _config.turnSpeed
          _config.angle += da
        }, 1000 / 60)
      },
      keyup() {
        clearInterval(timers.left)
        timers.left = null
      },
    },
    right: {
      keydown() {
        if (timers.right) {
          return
        }
        timers.right = setInterval(() => {
          const da = _config.speed / _config.maxSpeed * _config.turnSpeed
          _config.angle -= da
        }, 1000 / 60)
      },
      keyup() {
        clearInterval(timers.right)
        timers.right = null
      },
    },
    move() { }
  }
}