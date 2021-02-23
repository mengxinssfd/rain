import Scene from "./Scene";
import Rain from "./Rain";
import {setInterval} from "timers";

export default class Controller {

  constructor() {
    this.init();
  }

  init() {
    const scene = new Scene();
    const rainList: Rain[] = [];
    const create = (): Rain => {
      const r = new Rain(180);
      scene.addChild(r);
      r.draw();
      return r;
    };
    rainList.push(...[...Array(10)].map(() => {
      return create();
    }));

    const int = setInterval(() => {
      if (rainList.length > 200) {
        clearInterval(int);
        return;
      }
      rainList.push(create());
    }, 60);

    const update = () => {
      scene.clearCanvas();
      scene.setBg();
      rainList.forEach(rain => {
        rain.update();
      });
      window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
    // setInterval(update, 1000 / 60);
  }
}