class Game {
  constructor(ctx) {
    this.ctx = ctx;
    
    this.bg = new Background(ctx)
    this.mario = new Mario(ctx)
    this.intervalId = null;

    this.obstacles = [
      new Obstacle(ctx)
    ]

    this.tick = 0

    this.audio = new Audio("http://www.sonidosmp3gratis.com/sounds/mario-castle-bros.mp3")
    this.audio.loop = true;

    this.gameOverAudio = new Audio('http://www.sonidosmp3gratis.com/sounds/mario-bros-mamma-mia')
  }

  run() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._clearObstacles()
      this._checkCollisions()
    }, 1000 / 60)
  }

  _clearObstacles() {
    this.obstacles = this.obstacles.filter(o => {
      return o.x + o.w >= 0
    })
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.bg.draw()
    this.mario.draw()
    this.obstacles.forEach(o => o.draw())

    this.tick++

    if (this.tick > Math.random() * 300 + 200) {
      this.tick = 0
      this._addObstacle()
    }
  }

  _addObstacle() {
    this.obstacles.push(
      new Obstacle(this.ctx)
    )
  }

  _move() {
    this.bg.move()
    this.mario.move()
    this.obstacles.forEach(o => o.move())
  }

  _checkCollisions() {
    const col = this.obstacles.some(o => {
      return o.collide(this.mario)
    })

    if (col) {
      this._gameOver()
    }
  }

  _gameOver() {
    this.audio.pause()
    clearInterval(this.intervalId)

    this.gameOverAudio.play()
    this.ctx.font = "40px Comic Sans MS";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}