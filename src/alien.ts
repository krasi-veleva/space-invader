import { Sprite, Texture } from "pixi.js";
export class Alien extends Sprite {
    constructor() {
        super(Texture.from("alien"));

        this.init();
    }

    private init() {
        this.scale.set(0.1);
        this.anchor.set(0.5, 0.5);
    }
}
