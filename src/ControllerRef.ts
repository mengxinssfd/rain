import Scene from "./Scene";
import RainRef from "./RainRef";
import {forEachByLen, getAngle, Point, randomInt} from "@mxssfd/ts-utils";
import {Pool} from "./Pool";
import Drop from "./Drop";

export default class ControllerRef {
  private isStop = false;

  constructor() {
    this.init();
  }

  init() {
    let angle = 180;
    const scene = new Scene();
    const rainPool = new Pool(RainRef);
    const dropPool = new Pool(Drop);

    rainPool.events.on("add", (item: RainRef) => {
      scene.addChild(item);
      item.init(angle);
    });

    dropPool.events.on("add", (d: Drop, pos: Point) => {
      scene.addChild(d);
      d.init(pos);
    });

    const getLimitAngle = (ang: number) => {
      return ang > 220 ? 220 : (ang < 150 ? 150 : ang);
    };

    const si = window.setInterval(() => {
      if (rainPool.length > 1) window.clearInterval(si);
      rainPool.add();
    }, 200);

    addEventListener("mousemove", ev => {
      const {x, y} = ev;
      angle = getLimitAngle(getAngle([Scene.width / 2, 0], [x, y]));
      rainPool.forEach(r => r.setAngle(angle));
    });

    setInterval(() => {
      console.log("active rain", rainPool.length, "active drop", dropPool.length);
    }, 2000);


    const update = () => {
      scene.update();
      // scene.setBg();
      rainPool.forEach(rain => {
        rain.update();
        if (rain.die) {
          forEachByLen(randomInt(10), () => {
            dropPool.add([rain.x, rain.y]);
          });
          rain.init(angle);
        }
      });
      dropPool.forEach(drop => {
        drop.update();
        if (drop.die) {
          // drop.init([500, 500]);
          drop.parent!.removeChild(drop);
          dropPool.remove(drop);
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