import {getBorderWidthBySin, getRotatePoint, Point} from "./utils/coordinate";
import Node from "./super/Node";
import Scene from "./Scene";
import {randomNumber} from "./utils/utils";

export default class Rain extends Node {
  private width!: number;
  private initPoint!: Point;
  private startPoint!: Point;
  private speed!: number;

  constructor(private angle: number) {
    super();
  }

  private init() {
    const width = randomNumber(30, 50);
    this.width = width;
    const rangeStart = this.angle < 180 ? getBorderWidthBySin(Scene.height, 180 - this.angle - 90, 180 - this.angle) : 0;
    console.log(rangeStart);
    const rangeEnd = this.angle > 180 ? getBorderWidthBySin(Scene.height, 360 - this.angle - 90, 360 - this.angle) : 0;
    this.initPoint = [randomNumber(rangeStart, Scene.width + rangeEnd), -width];
    this.startPoint = this.initPoint;
    this.speed = width / 2;
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
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
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