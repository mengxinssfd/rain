import Container from "./Container";

let id = 0;
export default abstract class Node {
  readonly id: number;
  x: number = 0;
  y: number = 0;
  protected context!: CanvasRenderingContext2D;
  root: Node | null = null;

  protected constructor() {
    this.id = id++;
  }

  protected _parent: Container | null = null;

  getRoot() {
    if (!this.parent) return null;
    let node: Node = this;
    while (node.parent) {
      node = node.parent;
    }
    return node;
  }

  get parent(): Container | null {
    return this._parent;
  }

  get die(): boolean {
    return false;
  }

  abstract init(...arg: any[]);

  public setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }

  setParent(parent: Container) {
    this._parent = parent;
    this.root = this.getRoot();
  }

  public remove() {
    this._parent = null;
    this.root = null;
  }

  public onLoad() {

  }

  public update() {
  }

}