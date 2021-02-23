export default class Node {
  protected _parent: Node | null = null;
  protected context!: CanvasRenderingContext2D;

  constructor() {
  }


  get parent(): Node | null {
    return this._parent;
  }

  public setContext(ctx: CanvasRenderingContext2D) {
    this.context = ctx;
  }

  setParent(parent: Node) {
    this._parent = parent;
  }

  public remove() {
    this._parent = null;
  }

  public onLoad() {

  }

}