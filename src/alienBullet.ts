import { Sprite, Texture, Ticker } from "pixi.js";
import { gameHeight } from "./gameSettings";

export class AlienBullet extends Sprite {
    private ticker = Ticker.shared;
    private onTick: () => void;
    private speed = 6;

    constructor(private aliensBullets: AlienBullet[]) {
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
            this.destroyAlienBullet();
        }
    }

    private start() {
        this.ticker.add(this.onTick);
    }

    public destroyAlienBullet() {
        this.ticker.remove(this.onTick);

        this.aliensBullets.splice(this.aliensBullets.indexOf(this), 1);

        this.destroy();
        console.log("bullet is destroyed");
    }
}
