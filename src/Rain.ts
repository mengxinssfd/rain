import Node from "./super/Node";
import Scene from "./Scene";
import {randomNumber, getBorderWidthBySin, getRotatePoint, Point, randomColor} from "@mxssfd/ts-utils";

const randomInt = (start: number, end: number) => ~~randomNumber(start, end);
export default class Rain extends Node {
  private width!: number;
  private initPoint!: Point;
  private startPoint!: Point;
  private speed!: number;
  private color!: string;

  constructor(private angle: number) {
    super();
  }

  private init() {
    const width = randomInt(20, 40);
    this.width = width;
    const rangeStart = this.angle < 180 ? getBorderWidthBySin(Scene.height, 180 - this.angle - 90, 180 - this.angle) : 0;
    const rangeEnd = this.angle > 180 ? getBorderWidthBySin(Scene.height, 360 - this.angle - 90, 360 - this.angle) : 0;
    this.initPoint = [randomInt(rangeStart, Scene.width + rangeEnd), -width];
    this.startPoint = this.initPoint;
    this.speed = 2;
    // this.color = `rgba(255,255,255,${randomNumber(0.2, 0.7)})`;
    this.color = randomColor();
    if (this.isOutScene) return;
    this.draw();
  }

  public onLoad() {
    this.init();
  }

  public setAngle(angle: number) {
    this.angle = angle;
  }

  public draw() {
    const start = this.startPoint;
    const width = this.width;
    const angle = this.angle;
    const ctx = this.context;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    const end = getRotatePoint(start, width, angle);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();
  }

  get isOutScene() {
    const [x, y] = this.startPoint;
    return x < 0 || x > Scene.width || y > Scene.height;
  }

  get isOnBottom(): boolean {
    const [, y] = this.startPoint;
    // return x < 0 || x > Scene.width || y > Scene.height;
    return y > Scene.height;
  }

  public reset() {
    this.onLoad();
  }

  public update() {
    if (this.isOnBottom) {
      this.reset();
    }
    this.startPoint = getRotatePoint(this.startPoint, this.speed, this.angle);
    this.draw();
  }
}