import Scene from "./Scene";
import Rain from "./Rain";
import {forEachByLen, getAngle, Point, randomInt} from "@mxssfd/ts-utils";
import {Pool} from "./Pool";
import Drop from "./Drop";

export default class Controller {
  private isStop = false;

  constructor() {
    this.init();
  }

  init() {
    let angle = 180;
    const scene = new Scene();
    const rainList = new Pool<Rain>();
    const dropList = new Pool<Drop>();

    const createRain = (): Rain => {
      const r = rainList.add(() => new Rain());
      scene.addChild(r);
      r.init(angle);
      return r;
    };

    const createDrop = (pos: Point): Drop => {
      const d = dropList.add(() => new Drop());
      scene.addChild(d);
      d.init(pos);
      return d;
    };


    const getLimitAngle = (ang: number) => {
      return ang > 220 ? 220 : (ang < 150 ? 150 : ang);
    };

    const si = window.setInterval(() => {
      if (rainList.length > 200) window.clearInterval(si);
      createRain();
    }, 200);

    addEventListener("mousemove", ev => {
      const {x, y} = ev;
      angle = getLimitAngle(getAngle([Scene.width / 2, 0], [x, y]));
      rainList.forEach(r => r.setAngle(angle));
    });

    setInterval(() => {
      console.log("active rain", rainList.length, "active drop", dropList.length);
    }, 2000);

    const int = window.setInterval(() => {
      if (rainList.length > 200) {
        window.clearInterval(int);
        return;
      }
      rainList.add(() => createRain());
    }, 60);

    const update = () => {
      scene.update();
      // scene.setBg();
      rainList.forEach(rain => {
        rain.update();
        if (rain.die) {
          forEachByLen(randomInt(10), () => createDrop([rain.x, rain.y]));
          rain.init(angle);
        }
      });
      dropList.forEach(drop => {
        drop.update();
        if (drop.die) {
          // drop.init([500, 500]);
          drop.parent!.removeChild(drop);
          dropList.remove(drop);
        }
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