import Node from "./super/Node";
import Scene from "./Scene";
import {randomInt, randomFloat} from "@mxssfd/ts-utils";

export default class RainRef extends Node {
  private width!: number;
  private speed!: number;
  private color!: string;
  private speedX = 0;

  constructor() {
    super();
  }

  init() {
    const x = Math.random() * 2 * Scene.width - (0.5 * Scene.width);
    this.width = randomInt(20, 40);
    this.x = x;
    this.y = -50;
    this.speed = 5.5 * (Math.random() * 6 + 3);
    this.color = `rgba(255,255,255,${randomFloat(0.2, 0.7).toFixed(2)})`;
    // this.color = randomColor();
    if (this.isOutScene) return;
    this.draw();
  }

  public draw() {
    const width = this.width;
    const ctx = this.context;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + width * this.speedX, this.y + width);
    ctx.stroke();
    ctx.closePath();
  }

  setSpeedX(value: number) {
    this.speedX = value;
  }

  getSpeedX() {
    return this.speedX;
  }

  get isOutScene() {
    const {x, y} = this;
    const {clientWidth, clientHeight} = this.context.canvas;
    return x < 0 || x > clientWidth || y > clientHeight;
  }

  get die() {
    // return x < 0 || x > Scene.width || y > Scene.height;
    return this.y > Scene.height - 20;
  }

  public update() {
    this.y += this.speed;
    this.x += this.speedX * this.speed;
    this.draw();
  }
}