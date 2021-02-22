import Scene from "./Scene";
import {randomNumber} from "./utils";
import Rain from "./Rain";

export default class Controller {

    constructor() {
        this.init();
    }

    init() {
        const scene = new Scene();

        const rainList = [...Array(100)].map(() => {
                const r = new Rain(
                    [
                        randomNumber(0, Scene.width),
                        randomNumber(10, 20),
                    ],
                    randomNumber(10, 50),
                    180,
                    randomNumber(10, 50),
                );
                scene.addNode(r);
                r.draw();
                return r;
            },
        );
        const update = () => {
            console.log("update");
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