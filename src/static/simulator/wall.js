class Wall {
  constructor(ax, ay, bx, by) {
    this.ax = ax;
    this.ay = ay;
    this.bx = bx;
    this.by = by;
  }

  show() {
    strokeWeight(8);
    stroke("#ff6f61");
    line(this.ax, this.ay, this.bx, this.by);
  }
}