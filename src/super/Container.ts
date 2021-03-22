import Node from "./Node";

export default abstract class Container extends Node {
  protected children: Node[] = [];

  addChild(node: Node) {
    this.children.push(node);
    node.setContext(this.context);
    node.setParent(this);
    node.onLoad();
  }

  removeChild(node: Node) {
    const index = this.children.indexOf(node);
    if (index === -1) return;
    this.children.splice(index, 1);
    node.remove();
  }
}