import {getRotatePoint, Point} from "./coordinate";
import Node from "./Node";
import Scene from "./Scene";

export default class Rain extends Node {
    private startPoint: Point;

    constructor(
        private readonly point: Point,
        private readonly width: number,
        private readonly angle: number,
        private readonly speed: number
    ) {
        super();
        this.startPoint = point;
    }


    public draw() {
        const start = this.startPoint;
        const width = this.width;
        const angle = this.angle;
        const ctx = this.context;
        ctx.strokeStyle = "white";
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
        this.startPoint = this.point;
    }

    public update() {
        if (this.isOutScene) {
            this.reset();
        }
        this.startPoint = getRotatePoint(this.startPoint, this.speed, this.angle);
        this.draw();
    }
}