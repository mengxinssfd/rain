type Point = [number, number];

class Rain {
  constructor(pos: Point, directAngle, canvas) {

  }

  update() {

  }
}

class RainDrop {
  private readonly context: CanvasRenderingContext2D;

  constructor(private width: number, private height: number) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    if (!canvas.getContext) {
      throw new Error("canvas unsupported");
    }

    this.context = canvas.getContext("2d");
    this.setBg();
  }

  createRain() {

  }

  createRains() {

  }

  setBg(color = "black") {
    const ctx = this.context;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
new RainDrop(screenWidth, screenHeight);
