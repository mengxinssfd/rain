import {getRotatePoint, Point} from "./utils/coordinate";
import Node from "./super/Node";
import Scene from "./Scene";
import {randomNumber} from "./utils/utils";

export default class Rain extends Node {
  private width!: number;
  private initPoint!: Point;
  private startPoint!: Point;
  private speed!: number;

  constructor(private readonly angle: number) {
    super();
  }

  public onLoad() {
    const width = randomNumber(10, 20);
    this.width = width;
    this.initPoint = [randomNumber(0, Scene.width), -width];
    this.startPoint = this.initPoint;
    this.speed = width;

    this.draw();
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

  get isOutScene(): boolean {
    const [x, y] = this.startPoint;
    return x < 0 || x > Scene.width || y > Scene.height;
  }

  public reset() {
    this.startPoint = this.initPoint;
  }

  public update() {
    if (this.isOutScene) {
      this.reset();
    }
    this.startPoint = getRotatePoint(this.startPoint, this.speed, this.angle);
    this.draw();
  }
}