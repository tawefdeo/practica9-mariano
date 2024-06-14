class Obstacle {
  constructor(ctx) {
    this.ctx = ctx
    this.y = 243
    this.w = 20
    this.h = 40
    this.x = this.ctx.canvas.width
    this.vx = -5

    this.img = new Image()
    this.img.src = "yu.png"
    this.img.frames = 10
    this.img.frameIndex = 0
    
  }

  draw() {
    this.ctx.fillRect(
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  move() {
    this.x += this.vx
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }
}