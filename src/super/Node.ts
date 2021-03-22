import Container from "./Container";
export default abstract class Node {
  protected _parent: Container | null = null;
  protected context!: CanvasRenderingContext2D;
  x: number = 0;
  y: number = 0;


  get parent(): Container | null {
    return this._parent;
  }

  abstract init(...arg: any[]);

  get die(): boolean {
    return false;
  }

  public setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }

  setParent(parent: Container) {
    this._parent = parent;
  }

  public remove() {
    this._parent = null;
  }

  public onLoad() {

  }

  public update() {
  }

}