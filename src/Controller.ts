import Scene from "./Scene";
import Rain from "./Rain";
import {getAngle} from "./utils/coordinate";

export default class Controller {

  constructor() {
    this.init();
  }

  init() {
    let angle = 180;
    const scene = new Scene();
    const rainList: Rain[] = [];
    const create = (): Rain => {
      const r = new Rain(angle);
      scene.addChild(r);
      r.draw();
      return r;
    };

    const getLimitAngle = (ang: number) => {
      return ang > 220 ? 220 : (ang < 150 ? 150 : ang);
    };

    rainList.push(...[...Array(10)].map(() => {
      return create();
    }));

    addEventListener("mousemove", ev => {
      const {x, y} = ev;
      angle = getLimitAngle(getAngle([Scene.width / 2, 0], [x, y]));
      rainList.forEach(r => r.setAngle(angle));
    });

    const int = setInterval(() => {
      if (rainList.length > 2000) {
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