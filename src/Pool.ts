import {EventBus} from "@mxssfd/ts-utils";

type AddFn<T> = (aliveList: readonly T[], recycleList: readonly T[]) => T;

enum EventType {
  remove = 'remove'
}

// T的属性必须是可以在外部更改的
export class Pool<T> {
  readonly events = new EventBus();

  constructor() {
  }

  get length(): number {
    return this._aliveList.length;
  }

  private _aliveList: T[] = [];

  get aliveList(): T[] {
    return this._aliveList.slice();
  }

  private _recycleList: T[] = [];

  get recycleList(): T[] {
    return this._recycleList.slice();
  }

  add(addFn: AddFn<T>): T {
    const item = this.getRecycleOne() || addFn(this.aliveList, this.recycleList);
    if (this._aliveList.indexOf(item) > -1) return item;
    this._aliveList.push(item);
    return item;
  };

  remove(item: T) {
    const index = this._aliveList.indexOf(item);
    if (index === -1) return;
    this._aliveList.splice(index, 1);
    this._recycleList.push(item);
    this.events.emit(EventType.remove, item);
    return item;
  }

  pop() {
    const acList = this._aliveList;
    if (acList.length === 0) return;
    this._recycleList.push(acList.pop() as T);
  }

  shift() {
    const acList = this._aliveList;
    if (acList.length === 0) return;
    const item = acList.shift() as T;
    this.events.emit(EventType.remove, item);
    this._recycleList.push(item);
    return item;
  }

  forEach(callbackFn: (value: T, index: number, array: T[]) => void) {
    this._aliveList.forEach(callbackFn);
  }

  unshift(addFn: AddFn<T>): T {
    const item = this.getRecycleOne() || addFn(this.aliveList, this.recycleList);
    const acList = this._aliveList;
    const index = acList.indexOf(item);
    if (index > -1) {
      acList.splice(index, 1);
    }
    acList.unshift(item);
    return item;
  }

  getRecycleOne() {
    return this._recycleList.shift();
  }

  clear() {
  }

}