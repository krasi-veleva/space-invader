import * as PIXI from "pixi.js";
import { gameHeight, gameWidth } from "./gameSettings";

export class Bullet extends PIXI.Graphics {
    constructor() {
        super();

        this.beginFill(0xde3249);
        this.drawRect(0, 0, 5, 20);
        this.endFill();

        this.position.set(gameWidth / 2, gameHeight / 2);
    }
}
