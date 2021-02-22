export default class Node {

    protected children: Node[] = [];
    protected _parent: Node | null = null;
    protected context!: CanvasRenderingContext2D;


    constructor() {
    }

    addNode(node: Node) {
        this.children.push(node);
        node.setContext(this.context);
        node._parent = this;
    }

    get parent(): Node | null {
        return this._parent;
    }

    setContext(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
    }

    removeNode(node: Node) {
        const index = this.children.indexOf(node);
        if (index === -1) return;
        this.children.splice(index, 1);
        node._parent = null;
    }

}