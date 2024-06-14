class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx
    this.y = y
    this.x = x
    this.r = 5
    this.vx = 10
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
  }
}