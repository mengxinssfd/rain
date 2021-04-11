import Node from "./super/Node";
import {Point, randomInt} from "@mxssfd/ts-utils";
import Scene from "./Scene";


export default class DropRef extends Node {
  gravity: number = 0.5;
  speedX!: number;
  vx!: number;
  vy!: number;
  top!: number;
  radius!: number;

  constructor() {
    super();
  }

  init(pos: Point, speedX: number) {
    this.speedX = speedX;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = Math.random() * (-6) - 3;
    this.radius = Math.random() * 1.5 + 1;
    const [x, y] = pos;
    this.x = x;
    this.y = y;
    this.top = this.y - randomInt(50, 100);
    this.draw();
  }

  update() {
    const speedX = this.speedX;
    this.vx += speedX / 2;
    this.x += this.vx;

    this.vy += this.gravity;
    this.y += this.vy;
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