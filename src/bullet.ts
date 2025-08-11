import { Graphics } from "pixi.js";
import { gameHeight, gameWidth } from "./gameSettings";

export class Bullet extends Graphics {
    constructor() {
        super();

        this.rect(0, 0, 5, 20).fill(0xde3249);

        this.position.set(gameWidth / 2, gameHeight / 2);
    }
}
