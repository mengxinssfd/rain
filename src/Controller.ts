import Scene from "./Scene";
import Rain from "./Rain";
import {getAngle} from "@mxssfd/ts-utils";
import {Pool} from "./Pool";
import {clearInterval} from "timers";

export default class Controller {
  private isStop = false;

  constructor() {
    this.init();
  }

  init() {
    let angle = 180;
    const scene = new Scene();
    const rainList = new Pool<Rain>();

    const create = (): Rain => {
      const r = rainList.add(() => new Rain(0));
      r.setAngle(angle);
      scene.addChild(r);
      r.draw();
      return r;
    };

    const getLimitAngle = (ang: number) => {
      return ang > 220 ? 220 : (ang < 150 ? 150 : ang);
    };

    const si = setInterval(() => {
      if (rainList.length > 200) clearInterval(si);
      create();
    }, 200);

    addEventListener("mousemove", ev => {
      const {x, y} = ev;
      angle = getLimitAngle(getAngle([Scene.width / 2, 0], [x, y]));
      rainList.forEach(r => r.setAngle(angle));
    });


    const int = setInterval(() => {
      if (rainList.length > 200) {
        clearInterval(int);
        return;
      }
      rainList.add(() => create());
    }, 60);

    const update = () => {
      scene.update();
      // scene.setBg();
      rainList.forEach(rain => {
        rain.update();
      });
      scene.save();
      if (this.isStop) return;
      window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
    addEventListener("keydown", () => {
      this.isStop = !this.isStop;
      if (!this.isStop) update();
    });
    // setInterval(update, 1000 / 60);
  }
}