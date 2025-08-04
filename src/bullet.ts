import * as PIXI from "pixi.js";

export class Bullet extends PIXI.Graphics {
    constructor() {
        super();

        this.beginFill(0xde3249);
        this.drawRect(0, 0, 100, 100);
        this.endFill();
    }
}
