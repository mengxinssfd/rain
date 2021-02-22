import Node from "./Node";

export default class Scene extends Node {
    public static width = window.innerWidth;
    public static height = window.innerHeight;

    constructor() {
        super();
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = Scene.width;
        canvas.height = Scene.height;
        document.body.appendChild(canvas);

        if (!canvas.getContext) {
            throw new Error("canvas unsupported");
        }

        this.setContext(canvas.getContext("2d") as CanvasRenderingContext2D);
        this.setBg();
    }


    setBg(color = "black") {
        const ctx = this.context;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, Scene.width, Scene.height);
    }

    clearCanvas() {
        this.context.clearRect(0, 0, Scene.width, Scene.height);
    }
}