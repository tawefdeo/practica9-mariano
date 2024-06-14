const TOP_KEY = 38
const DOWN_KEY = 40
const RIGHT_KEY = 39
const LEFT_KEY = 37
const SPACE_KEY = 32

class Mario {
  constructor(ctx) {
    this.ctx = ctx
    this.x = 0.1 * this.ctx.canvas.width
    this.y0 = 192
    this.y = this.y0
    this.w = 80
    this.h0 = 100
    this.h = this.h0
    this.vx = 0
    this.vy = 5
    this.ay = 0.8

    this.img = new Image()
    this.img.src = "yu.png"
    this.img.frames = 10
    this.img.frameIndex = 0

    this.tick = 0

    this._setListeners()

    this.bullets = []

    this.jumpAudio = new Audio('http://www.sonidosmp3gratis.com/sounds/mario-bros-jump')
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this._animate()

    this.bullets.forEach(b => b.draw())
  }

  move() {
    this.x += this.vx

    if (this.y < this.y0) {
      this.vy += this.ay;
      this.y += this.vy;
    } else {
      this.vy = 0;

      if (this._isBend()) {
        this.y = this.y0 + this.h;
      } else {
        this.y = this.y0;
      }
      
    }

    this.bullets.forEach(b => b.move())
  }

  _animate() {
    this.tick++

    if (this.tick > 8) {
      this.tick = 0

      if (!this._isJumping()) {
        this.img.frameIndex++
      }
    }

    if (this.img.frameIndex >= this.img.frames) {
      this.img.frameIndex = 0
    }
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === TOP_KEY) {
        this._jump()
      } else if(e.keyCode === DOWN_KEY) {
        this._bend()
      } else if (e.keyCode === RIGHT_KEY) {
        this.vx = 5
      } else if (e.keyCode === LEFT_KEY) {
        this.vx = -5
      } else if (e.keyCode === SPACE_KEY) {
        this._shoot()
      }
    }

    document.onkeyup = (e) => {
      if (e.keyCode === DOWN_KEY) {
        this._stand()
      } else if (e.keyCode === RIGHT_KEY) {
        this.vx = 0
      } else if (e.keyCode === LEFT_KEY) {
        this.vx = 0
      }
    }
  }

  _shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        this.x + this.w,
        this.y + this.h / 2
      )
    )
  }

  _jump() {
    if (!this._isJumping()) {
      this.jumpAudio.play()
      this.img.frameIndex = 2
      this.y -= 10;
      this.vy -= 15;
    }
  }

  _bend() {
    if (!this._isBend()) {
      this.h = this.h0 / 2
      this.y += this.h
    }
  }

  _isBend() {
    return this.h !== this.h0
  }

  _stand() {
    this.h = this.h0
  }

  _isJumping() {
    return this.y < this.y0
  }
}