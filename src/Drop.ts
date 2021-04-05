import Node from "./super/Node";
import {Point, randomFloat, randomItem, randomInt} from "@mxssfd/ts-utils";
import Scene from "./Scene";

enum Gravity {
  up = -1,
  down = 1
}

enum Direct {
  left = -1,
  right = 1
}

export default class Drop extends Node {
  gravity !: Gravity;
  direct!: Direct;
  speed!: number;
  top!: number;
  radius!: number;

  constructor() {
    super();
  }

  init(pos: Point) {
    this.direct = randomItem([Direct.left, Direct.right]);
    this.speed = randomInt(1, 3);
    this.gravity = Gravity.up;
    this.radius = randomFloat(2.5);
    const [x, y] = pos;
    this.x = x;
    this.y = y;
    this.top = this.y - randomInt(50, 100);
    this.draw();
  }

  update() {
    this.x = this.x + (this.speed / 4 * this.direct);
    this.y = this.y + (this.gravity * this.speed);
    if (this.y < this.top) {
      this.gravity = Gravity.down;
    }
    this.draw();
  }

  draw() {
    const ctx = this.context;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, Math.random() * Math.PI * 2, Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  get die() {
    return this.y > Scene.height;
  }

}