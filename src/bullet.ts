import { Sprite, Texture } from "pixi.js";
import { gameHeight, gameWidth } from "./gameSettings";

export class Bullet extends Sprite {
    constructor() {
        super(Texture.from("bullet"));

        this.scale.set(0.1);
        this.anchor.set(0.5, 0.5);

        this.position.set(gameWidth / 2, gameHeight / 2);
    }
}
