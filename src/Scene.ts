import Container from "./super/Container";

export default class Scene extends Container {
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

    window.addEventListener("resize", () => {
      Scene.width = window.innerWidth;
      Scene.height = window.innerHeight;
      canvas.width = Scene.width;
      canvas.height = Scene.height;
    });

    this.setContext(canvas.getContext("2d") as CanvasRenderingContext2D);
    this.setBg();
    this.context.save();
  }

  init() {

  }

  setBg(color = "black") {
    const ctx = this.context;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, Scene.width, Scene.height);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, Scene.width, Scene.height);
  }

  save() {
    this.context.save();
  }

  update() {
    // this.context.restore();
    // this.context.save();
    this.setBg();
  }
}