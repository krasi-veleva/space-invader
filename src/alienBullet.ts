import { Sprite, Texture, Ticker } from "pixi.js";
import { gameHeight } from "./gameSettings";

export class AlienBullet extends Sprite {
    private ticker = Ticker.shared;
    private onTick: () => void;
    private speed = 5;

    constructor() {
        super(Texture.from("alienBullet"));

        this.init();
        this.onTick = this.bulletMovement.bind(this);
        this.start();
    }

    private init() {
        this.scale.set(0.06);
        this.anchor.set(0.5, 0.5);
    }

    private bulletMovement() {
        this.y += this.speed;

        if (this.y >= gameHeight) {
            console.log("destroying because out of screen");
            this.destroyBullet();
        }
    }

    private start() {
        this.ticker.add(this.onTick);
    }

    private destroyBullet() {
        this.ticker.remove(this.onTick);

        this.destroy();
        console.log("bullet is destroyed");
    }
}
