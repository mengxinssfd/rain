import Scene from "./Scene";
import RainRef from "./RainRef";
import {forEachByLen, Point, randomInt} from "@mxssfd/ts-utils";
import {Pool} from "./Pool";
import DropRef from "./DropRef";

export default class ControllerRef {
  private isStop = false;

  constructor() {
    this.init();
  }

  init() {
    let speedX = 0;
    const scene = new Scene();
    const rainPool = new Pool(RainRef);
    const dropPool = new Pool(DropRef);

    rainPool.events.on("add", (item: RainRef) => {
      scene.addChild(item);
      item.init();
      item.setSpeedX(speedX);
    });
    rainPool.events.on("remove", (item: RainRef) => {
      scene.removeChild(item);
    });

    dropPool.events.on("add", (d: DropRef, [pos, speedX]: [Point, number]) => {
      scene.addChild(d);
      d.init(pos, speedX);
    });
    dropPool.events.on("remove", (item: DropRef) => {
      scene.removeChild(item);
    });


    const w = Scene.width;
    addEventListener("mousemove", ev => {
      const {x} = ev;
      speedX = (x - w / 2) / (w / 2);
      rainPool.forEach(r => r.setSpeedX(speedX));
    });

    setInterval(() => {
      console.log("active rain", rainPool.length, "active drop", dropPool.length);
      if (rainPool.length < 1000) forEachByLen(randomInt(30, 100), () => rainPool.add());
    }, 200);


    const update = () => {
      scene.update();
      // scene.setBg();
      rainPool.forEach(rain => {
        rain.update();
        if (rain.die) {
          forEachByLen(randomInt(10), () => {
            dropPool.add([[rain.x, rain.y], rain.getSpeedX()]);
          });
          rainPool.remove(rain);
        }
      });
      dropPool.forEach(drop => {
        drop.update();
        if (drop.die) {
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