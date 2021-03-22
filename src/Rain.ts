import Node from "./super/Node";
import Scene from "./Scene";
import {randomInt, getBorderWidthBySin, getRotatePoint, Point, randomFloat} from "@mxssfd/ts-utils";

export default class Rain extends Node {
  private width!: number;
  private initPoint!: Point;
  private speed!: number;
  private color!: string;
  private angle!: number;

  constructor() {
    super();
  }

  init(angle: number) {
    this.angle = angle;
    const width = randomInt(20, 40);
    this.width = width;
    const rangeStart = this.angle < 180 ? getBorderWidthBySin(Scene.height, 180 - this.angle - 90, 180 - this.angle) : 0;
    const rangeEnd = this.angle > 180 ? getBorderWidthBySin(Scene.height, 360 - this.angle - 90, 360 - this.angle) : 0;
    this.initPoint = [randomInt(rangeStart, Scene.width + rangeEnd), -width];
    this.x = this.initPoint[0];
    this.y = this.initPoint[1];
    this.speed = width / 2;
    this.color = `rgba(255,255,255,${randomFloat(0.2, 0.7)})`;
    // this.color = randomColor();
    if (this.isOutScene) return;
    this.draw();
  }


  public setAngle(angle: number) {
    this.angle = angle;
  }

  public draw() {
    const width = this.width;
    const angle = this.angle;
    const ctx = this.context;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    const end = getRotatePoint([this.x, this.y], width, angle);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();
  }

  get isOutScene() {
    const {x, y} = this;
    return x < 0 || x > Scene.width || y > Scene.height;
  }

  get die() {
    // return x < 0 || x > Scene.width || y > Scene.height;
    return this.y > Scene.height - 20;
  }

  public update() {
    const newPoint = getRotatePoint([this.x, this.y], this.speed, this.angle);
    this.x = newPoint[0];
    this.y = newPoint[1];
    this.draw();
  }
}